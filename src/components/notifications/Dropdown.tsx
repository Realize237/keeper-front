import React, { useEffect, useRef, useState } from "react";
import { ReminderOptionType } from "../../interfaces/notifications";
import { MdClose } from "react-icons/md";
import { groupClassNames } from "../../utils";

interface DropdownProps {
  label: string;
  options: ReminderOptionType[];
  value?: string;
  onChange?: (value: string) => void;
  onDelete?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="group flex items-center space-x-2 relative">
      <div className="w-full">
        <div className="text-xs text-gray-500 mb-1">{label}</div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={groupClassNames(
            "w-full bg-inherit border px-3 py-2 text-sm rounded-lg border-neutral-600",
            "flex items-center justify-between text-neutral-400 shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-[#CDFF00]"
          )}
        >
          <span>{value || "Select reminder"}</span>
          <span className="text-xs">▾</span>
        </button>

        {open && (
          <div
            className={groupClassNames(
              "absolute z-50 bottom-full mb-1 w-full rounded-lg",
              "border border-neutral-300 bg-white text-gray-800",
              "shadow-lg max-h-40 overflow-y-auto"
            )}
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
                className={groupClassNames(
                  "px-3 py-2 text-sm cursor-pointer",
                  "hover:bg-gray-100",
                  value === option.value && "bg-gray-200 font-medium"
                )}
              >
                {option.value}
              </div>
            ))}
          </div>
        )}
      </div>

      {onDelete && (
        <MdClose
          className="block lg:hidden group-hover:block text-neutral-500 cursor-pointer hover:text-neutral-400"
          size={22}
          title="Delete reminder"
          onClick={onDelete}
        />
      )}
    </div>
  );
};

export default Dropdown;
