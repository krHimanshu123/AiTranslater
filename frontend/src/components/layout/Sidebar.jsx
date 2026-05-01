import { motion } from 'framer-motion';
import { Clock3, Heart, Languages, Settings2 } from 'lucide-react';

import { Card } from '../ui/Card';

const navItems = [
  { id: 'translator', label: 'Translator', icon: Languages },
  { id: 'history', label: 'History', icon: Clock3 },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings2 }
];

export const Sidebar = ({ activeView, onSelect }) => {
  return (
    <Card className="flex h-full flex-col gap-6 p-5">
      <div className="flex items-center gap-4">
        <motion.div
          animate={{
            rotateY: [0, 12, 0],
            rotateX: [0, -8, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="relative h-14 w-14 rounded-2xl bg-[linear-gradient(145deg,#4f8cff,#6b5cff_55%,#5ce1e6)] p-[1px] shadow-[0_16px_40px_rgba(79,140,255,0.35)]"
          style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Languages className="h-6 w-6" />
          </div>
        </motion.div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Workspace
          </p>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
            Translaix
          </h1>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onSelect(item.id)}
              whileHover={{ x: 4 }}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                isActive
                  ? 'bg-slate-950 text-white shadow-[0_16px_35px_rgba(15,23,42,0.18)] dark:bg-white/12'
                  : 'text-slate-600 hover:bg-white/70 dark:text-slate-300 dark:hover:bg-white/6'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-300/60 bg-slate-950 px-4 py-4 text-white dark:border-white/10">
        <p className="text-sm font-medium">Production flow</p>
        <p className="mt-2 text-xs leading-5 text-white/70">
          Backend history, favorites, health checks, and graceful translation retries are all wired in.
        </p>
      </div>
    </Card>
  );
};
