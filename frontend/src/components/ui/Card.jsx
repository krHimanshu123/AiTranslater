import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hover = false,
  style,
  ...props
}) => (
  <motion.div
    whileHover={hover ? { rotateX: 3, rotateY: -4, y: -4 } : undefined}
    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    style={{
      transformStyle: 'preserve-3d',
      ...style
    }}
    className={`rounded-[28px] border border-slate-300/65 bg-white/72 shadow-[0_22px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/7 dark:shadow-[0_24px_80px_rgba(2,6,23,0.45)] ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);
