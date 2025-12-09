import React from "react";
import { ReminderOptionType } from "../../interfaces/notifications";
import { MdClose } from "react-icons/md";

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
  return (
    <div className="group flex items-center space-x-2">
      <div>
        <div className="text-xs text-gray-500 mb-1">{label}</div>
        <div className="bg-inherit border px-3 py-2 text-sm rounded-lg border-neutral-600 flex items-center justify-between shadow-sm cursor-pointer">
          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="bg-transparent outline-none w-full text-neutral-500"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      {onDelete && (
        <MdClose
          className="hidden group-hover:block text-neutral-500 cursor-pointer hover:text-neutral-700"
          size={24}
          title="Delete reminder"
          onClick={onDelete}
        />
      )}
    </div>
  );
};

export default Dropdown;
