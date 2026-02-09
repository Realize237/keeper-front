import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import { useState } from 'react';
import { cn } from '../../utils/cn';
import Spinner from '../ui/Spinner';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SettingsSelectProps {
  value: string;
  options: Option[];
  isLoading?: boolean;
  onChange: (value: string) => void;
}

export const SettingsSelect = ({
  value,
  options,
  onChange,
  isLoading = false,
}: SettingsSelectProps) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        disabled={isLoading}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md text-sm',
          'border border-white/10',
          'bg-[#171717]',
          isLoading && 'opacity-60 cursor-not-allowed'
        )}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {selected?.icon && (
              <span className="flex items-center justify-center">
                {selected.icon}
              </span>
            )}
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
            gap-2
            px-4 py-2
            text-sm
            bg-[#171717]
            hover:bg-white/10 
            transition
          "
              >
                <div className="flex items-center gap-2">
                  {option.icon && (
                    <span className="flex items-center justify-center w-5 h-5">
                      {option.icon}
                    </span>
                  )}
                  <span>{option.label}</span>
                </div>
                {option.value === value && (
                  <FaCheck className="text-green-500 w-3 h-3" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
