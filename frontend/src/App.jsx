import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { ActivityPanel } from './components/panels/ActivityPanel';
import { TranslationWorkspace } from './components/translator/TranslationWorkspace';
import { HistoryView } from './components/views/HistoryView';
import { SettingsView } from './components/views/SettingsView';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { api } from './lib/api';
import { languageOptions as fallbackLanguageOptions } from './lib/languages';

const THEME_STORAGE_KEY = 'translaix_theme';
const AUTO_TRANSLATE_STORAGE_KEY = 'translaix_auto_translate';

const getInitialTheme = () => {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme) {
    return storedTheme === 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getInitialAutoTranslate = () => {
  const storedValue = window.localStorage.getItem(AUTO_TRANSLATE_STORAGE_KEY);
  return storedValue ? storedValue === 'true' : true;
};

const normalizeReuseItem = (item) => ({
  inputText: item.sourceText || item.inputText || '',
  translatedText: item.translatedText || '',
  sourceLang: item.sourceLang || 'auto',
  targetLang: item.targetLang || 'es'
});

const normalizeLanguageName = (code, name) => {
  if (name && name.trim()) {
    return name.trim();
  }

  return code.toUpperCase();
};

const normalizeLanguageOptions = (languages = []) => {
  const normalized = languages
    .filter((language) => language?.code)
    .map((language) => ({
      code: language.code,
      name: normalizeLanguageName(language.code, language.name)
    }))
    .sort((left, right) => left.name.localeCompare(right.name));

  return [
    { code: 'auto', name: 'Auto Detect' },
    ...normalized.filter((language) => language.code !== 'auto')
  ];
};

const App = () => {
  const [activeView, setActiveView] = useState('translator');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('es');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const [autoTranslate, setAutoTranslate] = useState(getInitialAutoTranslate);
  const [languageOptions, setLanguageOptions] = useState(fallbackLanguageOptions);
  const debouncedInputText = useDebouncedValue(inputText, 700);
  const autoTranslateSignatureRef = useRef('');

  const favorites = useMemo(
    () => history.filter((item) => item.isFavorite),
    [history]
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    window.localStorage.setItem(
      AUTO_TRANSLATE_STORAGE_KEY,
      String(autoTranslate)
    );
  }, [autoTranslate]);

  const loadHistory = async () => {
    try {
      const data = await api.getHistory();
      setHistory(data);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsHydrating(false);
    }
  };

  const loadHealth = async () => {
    try {
      const data = await api.getHealth();
      setStatus({
        healthy: true,
        ...data
      });
    } catch (healthError) {
      setStatus({
        healthy: false,
        message: healthError.message
      });
    }
  };

  const loadLanguages = async () => {
    try {
      const data = await api.getLanguages();
      const nextOptions = normalizeLanguageOptions(data);

      if (nextOptions.length > 1) {
        setLanguageOptions(nextOptions);
      }
    } catch (languageError) {
      setLanguageOptions(fallbackLanguageOptions);
    }
  };

  useEffect(() => {
    loadHistory();
    loadHealth();
    loadLanguages();
  }, []);

  const translate = async () => {
    if (!inputText.trim()) {
      setError('Enter some text to translate.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const data = await api.translateText({
        text: inputText,
        sourceLang,
        targetLang
      });

      setTranslatedText(data.translatedText);
      setDetectedLanguage(data.detectedLanguage || '');
      await loadHistory();
    } catch (translationError) {
      setError(translationError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!autoTranslate || !debouncedInputText.trim()) {
      return;
    }

    const signature = `${sourceLang}|${targetLang}|${debouncedInputText.trim()}`;
    if (autoTranslateSignatureRef.current === signature) {
      return;
    }

    autoTranslateSignatureRef.current = signature;
    translate();
  }, [autoTranslate, debouncedInputText, sourceLang, targetLang]);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        translate();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [inputText, sourceLang, targetLang]);

  const handleSwap = () => {
    const nextSource = targetLang;
    const nextTarget = sourceLang === 'auto' ? 'en' : sourceLang;
    setSourceLang(nextSource);
    setTargetLang(nextTarget);
    setInputText(translatedText || inputText);
    setTranslatedText(sourceLang === 'auto' ? '' : inputText);
    setDetectedLanguage('');
  };

  const handleReuse = (item) => {
    const nextValues = normalizeReuseItem(item);
    setInputText(nextValues.inputText);
    setTranslatedText(nextValues.translatedText);
    setSourceLang(nextValues.sourceLang);
    setTargetLang(nextValues.targetLang);
    setDetectedLanguage('');
    setActiveView('translator');
  };

  const handleToggleFavorite = async (id) => {
    try {
      await api.toggleFavorite(id);
      await loadHistory();
    } catch (toggleError) {
      setError(toggleError.message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await api.deleteHistoryItem(id);
      await loadHistory();
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  const handleCopy = async () => {
    if (!translatedText.trim()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (copyError) {
      setError(copyError.message);
    }
  };

  const handleDownload = () => {
    if (!translatedText.trim()) {
      return;
    }

    const blob = new Blob([translatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'translation.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSpeak = () => {
    if (!translatedText.trim()) {
      return;
    }

    if (!window.speechSynthesis) {
      setError('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const renderMainView = () => {
    if (activeView === 'history') {
      return (
        <HistoryView
          title="History"
          items={history}
          emptyMessage="No translations yet. Once you translate text, the backend-backed history will appear here."
          onDeleteItem={handleDeleteItem}
          onReuse={handleReuse}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    if (activeView === 'favorites') {
      return (
        <HistoryView
          title="Favorites"
          items={favorites}
          emptyMessage="No favorite translations yet. Mark a translation with the star to pin it here."
          onDeleteItem={handleDeleteItem}
          onReuse={handleReuse}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    if (activeView === 'settings') {
      return (
        <SettingsView
          autoTranslate={autoTranslate}
          onToggleAutoTranslate={() => setAutoTranslate((value) => !value)}
        />
      );
    }

    return (
      <TranslationWorkspace
        copied={copied}
        detectedLanguage={detectedLanguage}
        error={error}
        inputText={inputText}
        isLoading={isLoading}
        isSpeaking={isSpeaking}
        languageOptions={languageOptions}
        onChangeInput={(value) => {
          autoTranslateSignatureRef.current = '';
          setInputText(value);
          if (error) {
            setError('');
          }
        }}
        onClear={() => {
          autoTranslateSignatureRef.current = '';
          setInputText('');
          setTranslatedText('');
          setDetectedLanguage('');
          setError('');
        }}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onRetry={translate}
        onSpeak={handleSpeak}
        onSwap={handleSwap}
        onTranslate={{
          submit: translate,
          sourceChange: (value) => {
            autoTranslateSignatureRef.current = '';
            setSourceLang(value);
          },
          targetChange: (value) => {
            autoTranslateSignatureRef.current = '';
            setTargetLang(value);
          }
        }}
        sourceLang={sourceLang}
        targetLang={targetLang}
        translatedText={translatedText}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d8e9ff_0%,#edf4ff_34%,#f8fbff_60%,#eef3ff_100%)] text-slate-900 transition-colors dark:bg-[radial-gradient(circle_at_top_left,#0f172a_0%,#0b1120_34%,#040816_100%)] dark:text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/20"
        />
        <motion.div
          animate={{ x: [0, -35, 0], y: [0, -28, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-violet-400/16 blur-3xl dark:bg-violet-500/16"
        />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-[1680px] gap-5 px-4 py-5 xl:grid-cols-[260px_minmax(0,1fr)_360px]">
        <aside className="xl:sticky xl:top-5 xl:h-[calc(100vh-2.5rem)]">
          <Sidebar activeView={activeView} onSelect={setActiveView} />
        </aside>

        <main className="space-y-5">
          <TopBar
            appName="Translaix"
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode((value) => !value)}
            status={status}
            onRefreshStatus={loadHealth}
          />
          {renderMainView()}
        </main>

        <aside className="space-y-5">
          <ActivityPanel
            activeView={activeView}
            favorites={favorites}
            history={history}
            isLoading={isHydrating}
            onDeleteItem={handleDeleteItem}
            onReuse={handleReuse}
            onToggleFavorite={handleToggleFavorite}
          />
        </aside>
      </div>
    </div>
  );
};

export default App;
