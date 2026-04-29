#!/usr/bin/env python3
import argparse
import importlib.util
import os
import shutil
import socket
import subprocess
import sys
import time
import webbrowser


class Color:
    GREEN = "\033[92m"
    BLUE = "\033[94m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    END = "\033[0m"


def info(msg):
    print(f"{Color.BLUE}ℹ {msg}{Color.END}")


def success(msg):
    print(f"{Color.GREEN}✔ {msg}{Color.END}")


def warn(msg):
    print(f"{Color.YELLOW}⚠ {msg}{Color.END}")


def ensure_log_dir():
    if not os.path.exists("logs"):
        os.makedirs("logs")


def find_free_port(start_port: int) -> int:
    port = start_port
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(("127.0.0.1", port)) != 0:
                return port
        port += 1








def ensure_supported_python():
    version = sys.version_info
    if version >= (3, 14):
        raise RuntimeError(
            "Python 3.14 is not supported by pinned dependencies (pydantic-core). "
            "Use Python 3.12 (recommended) or 3.11."
        )

def ensure_python_module(module_name: str, install_hint: str):
    if importlib.util.find_spec(module_name) is None:
        raise RuntimeError(
            f"Missing Python module '{module_name}'. {install_hint}"
        )

def find_command(*candidates: str) -> str | None:
    for cmd in candidates:
        path = shutil.which(cmd)
        if path:
            return path
    return None


def run_backend(port: int, watch_mode: bool):
    ensure_python_module(
        "uvicorn",
        "Activate your venv and run: pip install -r requirements.txt",
    )
    ensure_python_module(
        "fastapi",
        "Activate your venv and run: pip install -r requirements.txt",
    )

    log_file = open("logs/backend.log", "w")
    success(f"Starting Backend (FastAPI) on port {port}...")

    uvicorn_cmd = [sys.executable, "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", str(port)]
    if watch_mode:
        uvicorn_cmd.append("--reload")

    return subprocess.Popen(uvicorn_cmd, stdout=log_file, stderr=log_file)


def run_frontend(port: int):
    log_file = open("logs/frontend.log", "w")
    success(f"Starting Frontend (Next.js) on port {port}...")

    env = os.environ.copy()
    env["PORT"] = str(port)
    env.setdefault("NEXT_PUBLIC_API_URL", "/api")
    env.setdefault("BACKEND_API_URL", f"http://127.0.0.1:{backend_port_global}")

    npm_cmd = find_command("npm", "npm.cmd")
    if not npm_cmd:
        raise FileNotFoundError(
            "npm was not found in PATH. Install Node.js and ensure npm is available."
        )

    cmd = [npm_cmd, "run", "dev", "--", "--port", str(port)]
    return subprocess.Popen(cmd, cwd="frontend", env=env, stdout=log_file, stderr=log_file)


def watch_and_restart() -> bool:
    last_mtimes = {}

    while True:
        time.sleep(1)
        changed = False

        for root, _, files in os.walk("."):
            for f in files:
                if f.endswith((".py", ".ts", ".tsx", ".js", ".css", ".txt")):
                    path = os.path.join(root, f)
                    try:
                        mtime = os.path.getmtime(path)
                    except OSError:
                        continue
                    if path not in last_mtimes:
                        last_mtimes[path] = mtime
                    elif last_mtimes[path] != mtime:
                        last_mtimes[path] = mtime
                        changed = True

        if changed:
            warn("Detected code change → restarting backend/frontend...")
            return True


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--watch", action="store_true", help="Enable auto-restart on file changes")
    args = parser.parse_args()

    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    ensure_supported_python()
    ensure_log_dir()

    backend_port = find_free_port(8000)
    frontend_port = find_free_port(3000)

    global backend_port_global
    backend_port_global = backend_port

    while True:
        try:
            backend = run_backend(backend_port, args.watch)
            time.sleep(2)

            frontend = run_frontend(frontend_port)
        except (RuntimeError, FileNotFoundError) as exc:
            warn(str(exc))
            info("Tip: use the same interpreter/venv for this script and backend dependencies.")
            info("Example: py -3.12 -m venv .venv && .venv\Scripts\activate && pip install -r requirements.txt")
            sys.exit(1)
        time.sleep(3)

        webbrowser.open(f"http://localhost:{frontend_port}")

        success("Genr8CV is running!")
        info(f"Backend:  http://localhost:{backend_port}/docs")
        info(f"Frontend: http://localhost:{frontend_port}")
        info("Logs: logs/backend.log and logs/frontend.log")

        if args.watch:
            if watch_and_restart():
                backend.terminate()
                frontend.terminate()
                time.sleep(1)
                continue

        try:
            backend.wait()
            frontend.wait()
        except KeyboardInterrupt:
            warn("Shutting down...")
            backend.terminate()
            frontend.terminate()
            sys.exit(0)

        break


if __name__ == "__main__":
    backend_port_global = 8000
    main()
