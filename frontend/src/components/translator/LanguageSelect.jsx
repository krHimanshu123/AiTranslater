import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';

export const LanguageSelect = ({
  allowAuto = false,
  label,
  onChange,
  options,
  value
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return options.filter((option) => {
      if (!allowAuto && option.code === 'auto') {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return option.name.toLowerCase().includes(normalizedQuery);
    });
  }, [allowAuto, options, query]);

  const selectedOption =
    options.find((option) => option.code === value) || options[0];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-300/70 bg-white/85 px-4 py-3 text-left text-slate-900 shadow-[0_14px_35px_rgba(15,23,42,0.06)] transition hover:border-slate-400/70 dark:border-white/10 dark:bg-white/8 dark:text-white"
      >
        <span>{selectedOption?.name}</span>
        <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
      </button>

      {isOpen ? (
        <div className="absolute z-20 mt-3 w-full rounded-3xl border border-slate-300/70 bg-white/95 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/92">
          <div className="mb-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100/80 px-3 py-2 dark:border-white/10 dark:bg-white/6">
            <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search language"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
            {filteredOptions.map((option) => {
              const isSelected = option.code === value;

              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => {
                    onChange(option.code);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm transition ${
                    isSelected
                      ? 'bg-slate-950 text-white dark:bg-white/12'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/6'
                  }`}
                >
                  <span>{option.name}</span>
                  {isSelected ? <Check className="h-4 w-4" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
