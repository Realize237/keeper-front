import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -6,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.15,
      ease: 'easeOut',
    },
  }),
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Select options',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleValue = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="w-full border border-border px-3 py-2 rounded-lg flex items-center justify-between transition"
      >
        <span className="text-sm">
          {selected.length
            ? selected
                .map(
                  (value) =>
                    options.find((option) => option.value === value)?.label
                )
                .join(', ')
            : placeholder}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <FiChevronDown className="text-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 mt-2 w-full bg-surface text-surface-foreground rounded-lg shadow-xl z-20 p-2 max-h-60 overflow-y-auto"
          >
            {options.map((option, index) => (
              <motion.label
                key={option.value}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3 px-2 py-2 rounded-md border-b border-border cursor-pointer text-sm hover:bg-muted transition"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={() => toggleValue(option.value)}
                  className="w-4 h-4 accent-primary"
                />
                <span>{option.label}</span>
              </motion.label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiSelectDropdown;
