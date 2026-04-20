# 🇩🇪 Applify — AI-Powered German CV & Cover Letter Generator  
_Create professional Bewerbungsunterlagen in one click_

Applify is a full-stack AI system built with **Python, FastAPI, Streamlit, DeepSeek/Ollama**, and **Jinja2 templating** to generate **German-formatted CVs (Lebenslauf)**, **Anschreiben (Cover Letters)**, and **Bewerbungsunterlagen guidance** based on official rules from **Bundesagentur für Arbeit (arbeitsagentur.de)**.

The user can:
- Upload an existing resume or manually enter details  
- Receive a structured German **Lebenslauf (CV)**  
- Generate a perfectly formatted **Anschreiben** following German employment standards  
- Get **easy-language versions**  
- Download everything as **PDF** or **DOCX**  
- View guidance on required **Bewerbungsunterlagen**  
- Use Applify LLM prompt logic to enforce correctness & structure

---

## ⭐ Features

### ✔ **1. AI-Generated German CV (Lebenslauf)**
- Follows official German CV rules  
- Chronological format  
- Automatic structure enforcement  
- Jinja2-based resume templates  
- Option to download as **PDF** or **DOCX**

### ✔ **2. AI-Generated Anschreiben (Cover Letter)**
- Includes professional structure:
  - Kontaktdaten  
  - Datum/Ort  
  - Betreff  
  - Anrede  
  - Einstieg  
  - Hauptteil  
  - Argumente  
  - Verbindung zum Unternehmen  
  - Schluss & Grußformel  
- Easy-language variant (Einfache Sprache)

### ✔ **3. Bewerbungsunterlagen Info Module**
Based on Arbeitsagentur rules:
- What goes into a German application  
- CV + Cover Letter + Zeugnisse  
- Optional components (Deckblatt, Motivationsschreiben, Anlagenverzeichnis)  

### ✔ **4. DeepSeek / Ollama / Local LLM Support**
- No OpenAI billing needed  
- Fully works offline with supported models  

### ✔ **5. Full Backend API**
- REST endpoint `/generate-resume`  
- JSON response  
- PDF & DOCX generation  

### ✔ **6. Full Streamlit UI**
- User inputs  
- Text display  
- Download buttons  
- Clean modern UI  

---

# 🏗️ Tech Stack

### **Backend**
- 🐍 Python 3.12+
- ⚡ FastAPI
- 🧠 DeepSeek / Ollama (or OpenAI if available)
- 📝 Jinja2 templates
- 📄 python-docx, ReportLab for PDF
- 🚀 Uvicorn

### **Frontend**
- 🎨 Streamlit UI
- 📤 File upload
- 📥 Resume download

### **Infrastructure**
- Docker-ready  
- GitHub Actions compatible  
- .env secrets isolation  

---

# 📂 Project Structure

APPLIFY/
├── main.py
├── api/
│ ├── ai_engine.py
│ ├── schemas.py
│ ├── format_engine.py
│ ├── utils.py
│ ├── prompts/applify_super_prompt.txt
│ └── template/
│ ├── german_resume_template.j2
│ └── german_cover_letter_template.j2
├── services/
│ └── llm_service.py
├── tests/
├── requirements.txt
├── Dockerfile
├── .gitignore
└── .env (ignored)


---

# 🚀 Installation & Setup

### **1. Clone repo**
```bash
git clone https://github.com/<your-user>/applify.git
cd applify

2. Create virtual environment
python -m venv .venv
.venv\Scripts\activate   # Windows

3. Install dependencies
pip install -r requirements.txt

4. Configure environment

Create a .env file:

APPLIFY_MODEL=deepseek
DEEPSEEK_API_KEY=your-key-here

5. Start backend
uvicorn main:app --reload


Runs on:

http://127.0.0.1:8000

6. Start Streamlit UI
streamlit run ui.py


Runs on:

http://localhost:8501

🧠 API Usage
POST /generate-resume
{
  "name": "Max Müller",
  "email": "max@example.com",
  "experience": [...],
  "skills": [...],
  "job_description": "...",
  "want_pdf": true
}

Returns:

cv_text

cover_letter_text

cv_simple

cover_letter_simple

unterlagen_info

pdf_base64

docx_base64

🛣️ Roadmap

 Add LinkedIn import

 Multi-language CV support

 ATS compatibility checker

 Export to Europass CV

 User accounts + cloud storage

📜 License

MIT License — free to use, modify, distribute.

🎯 Author

Sruthi Ravuru Kondiparthy
Python Developer • AI Engineer • LLM Applications Builder
