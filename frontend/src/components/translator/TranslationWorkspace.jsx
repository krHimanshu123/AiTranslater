import { motion } from 'framer-motion';
import {
  Check,
  Copy,
  Download,
  Eraser,
  LoaderCircle,
  Sparkles,
  Volume2
} from 'lucide-react';

import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { LanguageSelect } from './LanguageSelect';

const countWords = (text) =>
  text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;

export const TranslationWorkspace = ({
  copied,
  detectedLanguage,
  error,
  inputText,
  isLoading,
  isSpeaking,
  languageOptions,
  onChangeInput,
  onClear,
  onCopy,
  onDownload,
  onRetry,
  onSpeak,
  onSwap,
  onTranslate,
  sourceLang,
  targetLang,
  translatedText
}) => {
  const characterCount = inputText.length;
  const wordCount = countWords(inputText);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-6"
      style={{ perspective: 1800 }}
    >
      <Card
        hover
        className="relative overflow-hidden p-6 md:p-8"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,140,255,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(92,225,230,0.14),transparent_34%)]" />

        <div className="relative">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Sparkles className="h-4 w-4 text-sky-500" />
                Translation workspace
              </p>
              <h3 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
                Translate with speed and clarity
              </h3>
            </div>
          </div>

          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <LanguageSelect
              label="Source"
              value={sourceLang}
              options={languageOptions}
              allowAuto
              onChange={onTranslate.sourceChange}
            />

            <div className="flex items-end justify-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04, rotate: 180 }}
                whileTap={{ scale: 0.96 }}
                onClick={onSwap}
                className="h-12 w-12 rounded-2xl border border-slate-300/70 bg-white/80 text-slate-900 shadow-[0_14px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/8 dark:text-white"
              >
                ⇄
              </motion.button>
            </div>

            <LanguageSelect
              label="Target"
              value={targetLang}
              options={languageOptions}
              onChange={onTranslate.targetChange}
            />
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <div className="rounded-[28px] border border-slate-300/70 bg-white/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-white/10 dark:bg-slate-950/35">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Source text
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {characterCount} characters · {wordCount} words
                  </p>
                </div>
                {detectedLanguage ? (
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-700 dark:text-sky-300">
                    Detected: {detectedLanguage.toUpperCase()}
                  </span>
                ) : null}
              </div>

              <textarea
                value={inputText}
                onChange={(event) => onChangeInput(event.target.value)}
                placeholder="Type, paste, or reuse a previous translation..."
                className="h-72 w-full resize-none rounded-[24px] border border-slate-200/80 bg-slate-50/80 px-4 py-4 text-[15px] leading-7 text-slate-800 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400 dark:border-white/8 dark:bg-white/6 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>

            <div className="rounded-[28px] border border-slate-300/70 bg-white/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-white/10 dark:bg-slate-950/35">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Translation
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live result from LibreTranslate
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="subtle" className="px-3 py-2" onClick={onSpeak}>
                    <Volume2 className="h-4 w-4" />
                    {isSpeaking ? 'Stop' : 'Listen'}
                  </Button>
                  <Button variant="subtle" className="px-3 py-2" onClick={onCopy}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </div>

              <div className="flex h-72 flex-col rounded-[24px] border border-slate-200/80 bg-slate-50/80 px-4 py-4 dark:border-white/8 dark:bg-white/6">
                {isLoading ? (
                  <div className="space-y-3">
                    <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
                    <div className="h-4 w-full animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
                    <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Translating...
                    </div>
                  </div>
                ) : translatedText ? (
                  <p className="whitespace-pre-wrap text-[15px] leading-7 text-slate-800 dark:text-slate-100">
                    {translatedText}
                  </p>
                ) : (
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Your translated output will appear here.
                  </p>
                )}
              </div>
            </div>
          </div>

          {error ? (
            <div className="mt-5 flex flex-col gap-3 rounded-3xl border border-rose-300/70 bg-rose-50/80 px-4 py-4 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200 md:flex-row md:items-center md:justify-between">
              <span>{error}</span>
              <Button variant="subtle" onClick={onRetry}>
                Retry translation
              </Button>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Keyboard shortcut: <span className="font-medium text-slate-700 dark:text-slate-200">Ctrl/Cmd + Enter</span>
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="subtle" onClick={onClear}>
                <Eraser className="h-4 w-4" />
                Clear
              </Button>
              <Button variant="subtle" onClick={onDownload}>
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="primary" onClick={onTranslate.submit} disabled={isLoading}>
                {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                Translate now
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
