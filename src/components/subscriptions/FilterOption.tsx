import { AnimatePresence, motion } from 'framer-motion';
import { IoCheckmark } from 'react-icons/io5';

interface FilterOptionProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  icon?: string;
}

export const FilterOption = ({
  label,
  selected,
  onToggle,
  icon,
}: FilterOptionProps) => {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className={`
        flex items-center gap-2
        px-3 py-2 rounded-full text-xs
        border select-none
        transition-colors
        ${
          selected
            ? 'border-primary text-foreground'
            : 'border-border text-muted-foreground hover:border-border'
        }
      `}
    >
      <motion.span
        layout
        className={`
          flex items-center justify-center
          w-4 h-4 rounded-full border
          ${selected ? 'bg-primary border-primary' : 'border-border'}
        `}
      >
        <AnimatePresence>
          {selected && (
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <IoCheckmark className="text-primary-foreground text-[10px]" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
      {icon && (
        <span className="p-1 rounded-full bg-surface flex justify-center items-center">
          <img className="w-5 h-5" src={icon} />
        </span>
      )}
      {label}
    </motion.button>
  );
};
