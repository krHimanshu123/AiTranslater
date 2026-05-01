import { motion } from 'framer-motion';

const variants = {
  ghost:
    'border border-white/12 bg-white/6 text-slate-100 hover:bg-white/10 hover:border-white/20',
  primary:
    'bg-[linear-gradient(135deg,#4f8cff_0%,#6e6cff_50%,#5ce1e6_100%)] text-white shadow-[0_18px_45px_rgba(79,140,255,0.35)] hover:shadow-[0_20px_48px_rgba(92,225,230,0.28)]',
  subtle:
    'border border-slate-300/70 bg-white/75 text-slate-800 hover:bg-white dark:border-white/12 dark:bg-white/6 dark:text-slate-100 dark:hover:bg-white/10'
};

export const Button = ({
  children,
  className = '',
  variant = 'ghost',
  type = 'button',
  ...props
}) => (
  <motion.button
    type={type}
    whileHover={{ scale: 1.02, y: -1 }}
    whileTap={{ scale: 0.985 }}
    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);
