import { AnimatePresence, motion } from 'framer-motion';
import { MoonStar, RefreshCcw, SunMedium } from 'lucide-react';

import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const TopBar = ({
  appName,
  isDarkMode,
  onToggleTheme,
  status,
  onRefreshStatus
}) => {
  const isHealthy = status?.healthy;

  return (
    <Card className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
          Translation platform
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
          {appName}
        </h2>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={isHealthy ? 'healthy' : 'degraded'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
              isHealthy
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                : 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isHealthy ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span>
              {isHealthy
                ? `LibreTranslate connected${status?.languageCount ? ` · ${status.languageCount} languages` : ''}`
                : 'LibreTranslate unavailable'}
            </span>
          </motion.div>
        </AnimatePresence>

        <Button variant="subtle" onClick={onRefreshStatus}>
          <RefreshCcw className="h-4 w-4" />
          Retry status
        </Button>

        <Button variant="subtle" onClick={onToggleTheme} aria-label="Toggle theme">
          {isDarkMode ? (
            <SunMedium className="h-4 w-4" />
          ) : (
            <MoonStar className="h-4 w-4" />
          )}
          {isDarkMode ? 'Light mode' : 'Dark mode'}
        </Button>
      </div>
    </Card>
  );
};
