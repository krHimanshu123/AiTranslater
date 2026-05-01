import { SlidersHorizontal } from 'lucide-react';

import { Card } from '../ui/Card';

export const SettingsView = ({ autoTranslate, onToggleAutoTranslate }) => (
  <Card className="p-6">
    <div className="mb-6 flex items-center gap-3">
      <div className="rounded-2xl bg-sky-500/12 p-3 text-sky-500">
        <SlidersHorizontal className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Preferences
        </p>
        <h3 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
          Settings
        </h3>
      </div>
    </div>

    <div className="rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            Auto-translate
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Translate after a short pause while typing.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleAutoTranslate}
          className={`flex h-8 w-14 items-center rounded-full px-1 transition ${
            autoTranslate ? 'bg-sky-500' : 'bg-slate-300 dark:bg-white/12'
          }`}
          aria-pressed={autoTranslate}
        >
          <span
            className={`h-6 w-6 rounded-full bg-white transition ${
              autoTranslate ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  </Card>
);
