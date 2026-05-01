# Translaix (AiTranslater)

AI-powered translation web app built with a React (Vite) frontend and a Node.js/Express backend, using **LibreTranslate** as the translation engine.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-5-646CFF) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![SQLite](https://img.shields.io/badge/Database-SQLite-blue) ![LibreTranslate](https://img.shields.io/badge/LibreTranslate-self--hosted-orange)

---

## ✨ Features

- Multi-language translation (15+ languages) with auto-detection
- Modern UI with animations + **Dark Mode**
- Text-to-speech (speech synthesis) for source and translated text
- Translation history + favorites
- Copy-to-clipboard
- Keyboard shortcut: **Ctrl + Enter** to translate
- Responsive layout (desktop + mobile)

---

## 🏗️ Tech Stack

**Frontend**
- React + Vite
- TailwindCSS
- Framer Motion
- Lucide React

**Backend**
- Node.js + Express
- SQLite (better-sqlite3)
- Axios, CORS, dotenv

**Translation Engine**
- LibreTranslate (self-hosted)
- Python (for running LibreTranslate)

---

## 📂 Project Structure

```text
AiTranslater/
  frontend/        # React (Vite) client
  backend/         # Express API + SQLite
  LibreTranslate/  # LibreTranslate service (Python)
  README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**
- Python **3.8+** (for LibreTranslate)
- Git

### 1) Clone

```bash
git clone https://github.com/krHimanshu123/AiTranslater.git
cd AiTranslater
```

### 2) Install dependencies

```bash
# root (if applicable)
npm install

# frontend
cd frontend
npm install

# backend
cd ../backend
npm install
```

### 3) Configure environment variables (backend)

```bash
cd backend
cp .env.example .env
```

Example `backend/.env`:

```env
PORT=3001
SQLITE_PATH=./data/translations.db
LIBRETRANSLATE_URL=http://127.0.0.1:5000
```

### 4) Run LibreTranslate

```bash
cd ../LibreTranslate
pip install -r requirements.txt
python main.py
```

### 5) Start backend + frontend

**Terminal 1 (backend):**

```bash
cd backend
npm start
```

**Terminal 2 (frontend):**

```bash
cd frontend
npm run dev
```

### 6) Open the app

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- LibreTranslate: http://localhost:5000

---

## 📖 API

### Translate

**POST** `/api/translate`

Request:

```json
{
  "text": "Hello, world!",
  "sourceLang": "en",
  "targetLang": "es"
}
```

Response:

```json
{
  "translatedText": "¡Hola, mundo!",
  "detectedLanguage": "en"
}
```

---

## 🌍 Supported Languages

- English, Spanish, French, German, Italian, Portuguese
- Russian, Japanese, Korean, Chinese, Arabic, Hindi
- Thai, Turkish
- Auto-detect

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📝 License

MIT — see [LICENSE](LICENSE)

---

## 👤 Author

**Himanshu Kumar**  
GitHub: [@krHimanshu123](https://github.com/krHimanshu123)

---

If you found this project helpful, please ⭐ the repo!
