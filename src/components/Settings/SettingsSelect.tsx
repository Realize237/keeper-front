import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import { useState } from 'react';
import { cn } from '../../utils/cn';
import Spinner from '../ui/Spinner';

interface Option {
  value: string;
  label: string;
}

interface SettingsSelectProps {
  value: string;
  options: Option[];
  isChangingLanguage: boolean;
  onChange: (value: string) => void;
}

export const SettingsSelect = ({
  value,
  options,
  onChange,
  isChangingLanguage = false,
}: SettingsSelectProps) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        disabled={isChangingLanguage}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md text-sm',
          'border border-white/10',
          'bg-[#171717]',
          isChangingLanguage && 'opacity-60 cursor-not-allowed'
        )}
      >
        {isChangingLanguage ? (
          <Spinner />
        ) : (
          <>
            {selected?.label}
            <FaChevronDown
              className={`w-3 h-3 transition ${open ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="
              absolute right-0 mt-2 z-50
              w-44
              rounded-xl
            bg-[#171717]
              shadow-xl
              overflow-hidden
            "
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="
                  w-full flex items-center justify-between
                  px-4 py-2
                  text-sm
                 bg-[#171717]
                 hover:bg-white/10 
                  transition
                "
              >
                {option.label}
                {option.value === value && (
                  <FaCheck className="text-white/70" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
