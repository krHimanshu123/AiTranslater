import { Heart, RotateCcw, Trash2 } from 'lucide-react';

import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const formatDate = (value) =>
  new Date(value).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

export const HistoryView = ({
  emptyMessage,
  items,
  onDeleteItem,
  onReuse,
  onToggleFavorite,
  title
}) => (
  <Card className="p-6">
    <div className="mb-6 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Records
        </p>
        <h3 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {items.length} items
      </p>
    </div>

    <div className="space-y-4">
      {items.length ? (
        items.map((item) => (
          <div
            key={item.id}
            className="rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/6"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white dark:bg-white/12">
                    {item.sourceLang.toUpperCase()} → {item.targetLang.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  {item.sourceText}
                </p>
                <p className="mt-3 text-base text-slate-900 dark:text-white">
                  {item.translatedText}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="subtle" className="px-3 py-2" onClick={() => onReuse(item)}>
                  <RotateCcw className="h-4 w-4" />
                  Reuse
                </Button>
                <Button variant="subtle" className="px-3 py-2" onClick={() => onToggleFavorite(item.id)}>
                  <Heart className={`h-4 w-4 ${item.isFavorite ? 'fill-current text-rose-500' : ''}`} />
                  {item.isFavorite ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button variant="subtle" className="px-3 py-2" onClick={() => onDeleteItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-[28px] border border-dashed border-slate-300 px-4 py-12 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
          {emptyMessage}
        </div>
      )}
    </div>
  </Card>
);
