# 🌐 Translaix

A modern, full-stack AI-powered translation application built with React, Node.js, and LibreTranslate. Features a beautiful interface with dark mode, translation history, favorites, and speech synthesis.

![Translaix Demo](https://img.shields.io/badge/React-19-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![SQLite](https://img.shields.io/badge/Database-SQLite-blue) ![LibreTranslate](https://img.shields.io/badge/Translation-LibreTranslate-orange)


## ✨ Features

- 🌍 **Multi-language Support**: 15+ languages with auto-detection
- 🎨 **Modern UI**: Beautiful gradient design with Framer Motion animations
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 🗣️ **Speech Synthesis**: Text-to-speech for both source and translated text
- 📋 **Clipboard Integration**: Easy copy functionality
- 📚 **Translation History**: Keep track of recent translations
- ⭐ **Favorites**: Save important translations
- 🎯 **Keyboard Shortcuts**: Ctrl+Enter to translate
- 📱 **Responsive Design**: Works on desktop and mobile
- 💾 **Export Functionality**: Export translations as .jsx files

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React 19 with TypeScript support
- **Build Tool**: Vite for fast development
- **Styling**: TailwindCSS with custom animations
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Hooks

### Backend (Node.js + Express)
- **Runtime**: Node.js with Express.js
- **Database**: SQLite (better-sqlite3)
- **API**: RESTful endpoints
- **CORS**: Enabled for cross-origin requests

### Translation Engine
- **Service**: LibreTranslate (self-hosted)
- **Languages**: 15+ supported languages
- **Features**: Auto-detection, confidence scoring

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.8+ (for LibreTranslate)
- Git

### Installation


1. **Clone the repository**
   ```bash
   git clone https://github.com/krHimanshu123/Translaix.git
   cd Translaix
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in backend directory
   cd backend
   cp .env.example .env
   ```
   
   Add your MongoDB connection string:
   ```env
   PORT=3001
   SQLITE_PATH=./data/translations.db
   LIBRETRANSLATE_URL=http://127.0.0.1:5000
   ```

4. **Set up LibreTranslate**
   ```bash
   cd ../LibreTranslate
   pip install -r requirements.txt
   python main.py
   ```

5. **Start the application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   
   **Terminal 3 - LibreTranslate:**
   ```bash
   cd LibreTranslate
   python main.py
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - LibreTranslate: http://localhost:5000


## 📖 API Documentation

### Translation Endpoint

**POST** `/api/translate`

```json
{
  "text": "Hello, world!",
  "sourceLang": "en",
  "targetLang": "es"
}
```

**Response:**
```json
{
  "translatedText": "¡Hola, mundo!",
  "detectedLanguage": "en"
}
```

## 🌍 Supported Languages

- 🇺🇸 English
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇩🇪 German
- 🇮🇹 Italian
- 🇵🇹 Portuguese
- 🇷🇺 Russian
- 🇯🇵 Japanese
- 🇰🇷 Korean
- 🇨🇳 Chinese
- 🇸🇦 Arabic
- 🇮🇳 Hindi
- 🇹🇭 Thai
- 🇹🇷 Turkish
- 🌐 Auto-detect

## 🛠️ Technologies Used

### Frontend
- React 19
- Vite
- TailwindCSS
- Framer Motion
- Lucide React
- JavaScript/JSX

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- Axios
- CORS
- dotenv

### Translation
- LibreTranslate
- Argos Translate
- Python

## 🎯 Usage

1. **Select Languages**: Choose source and target languages from the dropdowns
2. **Enter Text**: Type or paste text in the source textarea
3. **Translate**: Click the translate button or press Ctrl+Enter
4. **Listen**: Use the speaker icon to hear the pronunciation
5. **Copy**: Click the copy icon to copy text to clipboard
6. **Save**: Add translations to favorites with the star icon
7. **History**: View recent translations in the history panel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Himanshu Kumar**
- GitHub: [@krHimanshu123](https://github.com/krHimanshu123)

## 🙏 Acknowledgments

- [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) for the translation engine
- [React](https://reactjs.org/) for the frontend framework
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for icons

## 📊 Project Status

🚀 **Active Development** - This project is actively maintained and new features are being added regularly.


---

⭐ If you found this project helpful, please give it a star!
