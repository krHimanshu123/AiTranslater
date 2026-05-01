import { motion } from 'framer-motion';
import { Heart, RotateCcw, Star, Trash2 } from 'lucide-react';

import { quickReusePrompts } from '../../lib/languages';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const formatDate = (value) =>
  new Date(value).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

export const ActivityPanel = ({
  activeView,
  favorites,
  history,
  isLoading,
  onDeleteItem,
  onReuse,
  onToggleFavorite
}) => {
  const visibleHistory = history.slice(0, 5);
  const visibleFavorites = favorites.slice(0, 4);

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Context
            </p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
              {activeView === 'favorites' ? 'Favorite translations' : 'Recent activity'}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="space-y-2 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/8 dark:bg-white/6"
              >
                <div className="h-3 w-1/3 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
                <div className="h-4 w-full animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
                <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
              </div>
            ))
          ) : visibleHistory.length ? (
            visibleHistory.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -2 }}
                className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/8 dark:bg-white/6"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {item.sourceLang.toUpperCase()} → {item.targetLang.toUpperCase()}
                  </p>
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(item.id)}
                    className={`rounded-full p-2 transition ${
                      item.isFavorite
                        ? 'bg-amber-500/12 text-amber-500'
                        : 'bg-slate-200/70 text-slate-500 dark:bg-white/6 dark:text-slate-400'
                    }`}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-slate-800 dark:text-slate-100">
                  {item.translatedText}
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {formatDate(item.createdAt)}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Button variant="subtle" className="px-3 py-2" onClick={() => onReuse(item)}>
                    <RotateCcw className="h-4 w-4" />
                    Reuse
                  </Button>
                  <Button variant="subtle" className="px-3 py-2" onClick={() => onDeleteItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="rounded-3xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
              Translate something to build your shared history.
            </p>
          )}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Favorites
          </h3>
          <Heart className="h-4 w-4 text-rose-400" />
        </div>
        <div className="space-y-3">
          {visibleFavorites.length ? (
            visibleFavorites.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onReuse(item)}
                className="w-full rounded-3xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-left transition hover:border-sky-300 dark:border-white/8 dark:bg-white/6"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {item.sourceLang.toUpperCase()} → {item.targetLang.toUpperCase()}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-800 dark:text-slate-100">
                  {item.translatedText}
                </p>
              </button>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Mark important translations to pin them here.
            </p>
          )}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Quick reuse
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {quickReusePrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() =>
                onReuse({
                  inputText: prompt,
                  sourceText: prompt,
                  sourceLang: 'en',
                  targetLang: 'es',
                  translatedText: ''
                })
              }
              className="rounded-full border border-slate-300/80 px-3 py-2 text-xs text-slate-700 transition hover:border-sky-400 hover:text-sky-700 dark:border-white/10 dark:text-slate-300 dark:hover:text-sky-300"
            >
              {prompt}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};
