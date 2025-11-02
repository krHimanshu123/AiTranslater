import React, { useState, useEffect } from "react";
import {
  Languages, ArrowRightLeft, Volume2, Copy, History, Star, Trash2, Loader2, Sun, Moon
} from "lucide-react";
import { motion } from "framer-motion";


const languages = [
  { code: "auto", name: "Auto Detect", flag: "🌐" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" }
];


export default function AITranslator() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({ text: sourceText, sourceLang, targetLang }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      const detectedLang =
        typeof data.detectedLanguage === "object"
          ? data.detectedLanguage.language
          : data.detectedLanguage || "";
      setTranslatedText(data.translatedText);
      setDetectedLanguage(detectedLang);
      const historyItem = {
        id: Date.now(),
        sourceText,
        translatedText: data.translatedText,
        sourceLang: sourceLang === "auto" ? detectedLang : sourceLang,
        targetLang,
        timestamp: new Date().toISOString(),
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 19)]);
    } catch (error) {
      setTranslatedText("Error occurred during translation. Please try again.");
    }
    setIsLoading(false);
  };

  
  const swapLanguages = () => {
    if (sourceLang === "auto") return;
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const speakText = (text, lang) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  
  const addToFavorites = (item) => {
    const favorite = { ...item, id: Date.now() };
    setFavorites((prev) => [favorite, ...prev]);
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => setHistory([]);

  const loadFromHistory = (item) => {
    setSourceText(item.sourceText);
    setTranslatedText(item.translatedText);
    setSourceLang(item.sourceLang);
    setTargetLang(item.targetLang);
    
  };

  // Export as .jsx file
  const handleExport = () => {
    const code = `
/* AITranslator.jsx */
${document.getElementById("ai-translator-root")?.innerHTML || "// Paste your code here"}
    `;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AITranslator.jsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={(darkMode ? "dark " : "") + "min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex flex-col items-center py-10 font-sans relative overflow-x-hidden"}>
      {/* Dark Mode Toggle & Export Button */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setDarkMode((d) => !d)}
          className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white shadow"
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button
          onClick={handleExport}
          className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors text-white shadow"
          title="Export as .jsx"
        >
          💾
        </button>
      </div>
      {/* Animated background blobs with Framer Motion */}
      <motion.div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-indigo-400/40 rounded-full blur-3xl animate-pulse" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute top-1/2 -right-40 w-[28rem] h-[28rem] bg-purple-500/40 rounded-full blur-3xl animate-pulse delay-1000" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: 0.4 }}
          className="absolute -bottom-32 left-1/3 w-[30rem] h-[30rem] bg-blue-400/40 rounded-full blur-3xl animate-pulse delay-500" />
      </motion.div>

      <div
        id="ai-translator-root"
        className="w-full max-w-4xl bg-white/90 dark:bg-gray-900/90 rounded-[2.5rem] shadow-2xl border border-white/30 dark:border-gray-700 p-6 md:p-12 mb-10 backdrop-blur-xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-2">
            <Languages className="w-12 h-12 text-indigo-600 dark:text-indigo-300 mr-3 drop-shadow" />
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 dark:from-indigo-200 dark:via-purple-300 dark:to-blue-300 drop-shadow-lg tracking-tight">
              AI Translator
            </h1>
          </div>
          <p className="text-lg md:text-xl text-indigo-500 dark:text-indigo-200 max-w-2xl mx-auto font-medium">
            Experience the power of AI-driven translation with a beautiful, modern interface
          </p>
        </div>

        {/* Language Selection */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4"
        >
          <div className="flex-1 w-full">
            <label htmlFor="sourceLang" className="block text-indigo-700 font-semibold mb-2">From</label>
            <select
              id="sourceLang"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="w-full bg-indigo-50 text-indigo-900 rounded-xl px-4 py-3 border border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-white text-indigo-900">
                  {lang.flag} {lang.name}
                </option>
              
              ))}
            </select>
            {detectedLanguage && sourceLang === "auto" && (
              <p className="text-indigo-500 text-sm mt-1">
                Detected: {languages.find(l => l.code === detectedLanguage)?.name}
              </p>
            )}
          </div>
          <button
            onClick={swapLanguages}
            disabled={sourceLang === "auto"}
            className="mx-0 md:mx-6 my-2 md:my-0 p-3 bg-gradient-to-br from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg border border-indigo-200"
          >
            <ArrowRightLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1 w-full">
            <label htmlFor="targetLang" className="block text-indigo-700 font-semibold mb-2">To</label>
            <select
              id="targetLang"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full bg-indigo-50 text-indigo-900 rounded-xl px-4 py-3 border border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
            >
              {languages.filter(lang => lang.code !== "auto").map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-white text-indigo-900">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Translation Areas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Source Text */}
          <div className="space-y-4">
            <div className="relative">
              <textarea
                id="sourceText"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-44 md:h-52 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-indigo-900 dark:text-indigo-100 rounded-[1.75rem] px-6 py-4 border-2 border-indigo-200 dark:border-gray-700 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-200/50 resize-none placeholder-indigo-400 dark:placeholder-indigo-300 shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.01]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) handleTranslate();
                }}
              />
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {sourceText && (
                  <>
                    <button
                      onClick={() => speakText(sourceText, sourceLang)}
                      className="p-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-600 active:scale-90 rounded-xl transition-all duration-300 shadow-md"
                      title="Speak"
                    >
                      <Volume2 className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(sourceText)}
                      className="p-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-600 active:scale-90 rounded-xl transition-all duration-300 shadow-md"
                      title="Copy"
                    >
                      <Copy className="w-4 h-4 text-white" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="text-right text-indigo-400 dark:text-indigo-200 text-xs italic tracking-wide animate-fade-in">{sourceText.length} characters</div>
          </div>

          {/* Translated Text */}
          <div className="space-y-4">
            <div className="relative">
              <textarea
                id="translatedText"
                value={translatedText}
                readOnly
                placeholder="Translation will appear here..."
                className="w-full h-44 md:h-52 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-indigo-900 dark:text-indigo-100 rounded-[1.75rem] px-6 py-4 border-2 border-blue-200 dark:border-gray-700 resize-none placeholder-blue-400 dark:placeholder-blue-200 shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.01]"
              />
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {translatedText && (
                  <>
                    <button
                      onClick={() => speakText(translatedText, targetLang)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-xl transition-colors shadow-md"
                      title="Speak"
                    >
                      <Volume2 className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(translatedText)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-xl transition-colors shadow-md"
                      title="Copy"
                    >
                      <Copy className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => addToFavorites({
                        sourceText,
                        translatedText,
                        sourceLang,
                        targetLang,
                        timestamp: new Date().toISOString()
                      })}
                      className="p-3 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-500 active:scale-95 rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                      title="Add to Favorites"
                    >
                      <Star className="w-5 h-5 text-white" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Translate Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-10"
        >
          <button
            onClick={handleTranslate}
            disabled={!sourceText.trim() || isLoading}
            className="px-14 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 dark:from-indigo-700 dark:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 shadow-lg text-lg tracking-wide"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Translating...
              </div>
            ) : (
              "Translate"
            )}
          </button>
          <p className="text-indigo-400 dark:text-indigo-200 text-sm mt-2">Press Ctrl+Enter to translate</p>
        </motion.div>

        {/* History and Favorites */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="animate-fade-in-up transition-all duration-700 delay-150"
        >
          {/* History */}
          <div className="bg-white/80 dark:bg-gray-800 rounded-2xl shadow border border-indigo-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-200 flex items-center">
                <History className="w-5 h-5 mr-2" />
                Recent Translations
              </h3>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="p-2 bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 rounded-lg transition-colors shadow-md"
                  title="Clear History"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-indigo-300 dark:text-indigo-400 text-center py-8">No translations yet</p>
              ) : (
                history.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="p-3 bg-indigo-50 dark:bg-gray-900 rounded-xl cursor-pointer hover:bg-indigo-100 dark:hover:bg-gray-800 transition-colors border border-indigo-100 dark:border-gray-700 shadow-sm"
                  >
                    <div className="text-sm text-indigo-900 dark:text-indigo-100 truncate">{item.sourceText}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-300 truncate mt-1">{item.translatedText}</div>
                    <div className="text-xs text-indigo-500 dark:text-indigo-300 mt-1">
                      {languages.find(l => l.code === item.sourceLang)?.flag} {languages.find(l => l.code === item.sourceLang)?.name}
                      {" → "}
                      {languages.find(l => l.code === item.targetLang)?.flag} {languages.find(l => l.code === item.targetLang)?.name}
                    </div>
                  </div>
                ))
              )}

          {/* Favorites */}
          <div className="bg-white/80 dark:bg-gray-800 rounded-2xl shadow border border-yellow-100 dark:border-yellow-700 p-6 mt-8">
            <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-300 mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Favorites
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {favorites.length === 0 ? (
                <p className="text-yellow-400 dark:text-yellow-200 text-center py-8">No favorites yet</p>
              ) : (
                favorites.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-yellow-50 dark:bg-gray-900 rounded-xl border border-yellow-100 dark:border-yellow-700 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-sm text-yellow-900 dark:text-yellow-200 truncate">{item.sourceText}</div>
                        <div className="text-sm text-blue-600 dark:text-blue-300 truncate mt-1">{item.translatedText}</div>
                        <div className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                          {languages.find(l => l.code === item.sourceLang)?.flag} {languages.find(l => l.code === item.sourceLang)?.name}
                          {" → "}
                          {languages.find(l => l.code === item.targetLang)?.flag} {languages.find(l => l.code === item.targetLang)?.name}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromFavorites(item.id)}
                        className="p-2 bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 active:scale-95 rounded-lg text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

