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
        className="w-full border border-neutral-500 px-3 py-2 rounded-lg flex items-center justify-between transition"
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
        <FiChevronDown className="text-neutral-400" />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-full bg-neutral-100 text-neutral-700 rounded-lg shadow-xl z-20 p-2 max-h-60 overflow-y-auto animate-fadeIn">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 px-2 py-2 rounded-md border-b border-gray-100 cursor-pointer text-sm"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => toggleValue(option.value)}
                className="w-4 h-4 accent-blue-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
