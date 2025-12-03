import { useState } from "react";

export default function NotificationFilterToggle({
  onChange,
  style
}: {
  onChange: (isRead: boolean) => void;
  style?: string;
}) {
  const [selected, setSelected] = useState<boolean>(false);

  const handleSelect = (value: boolean) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className={`relative ${style} bg-neutral-700 rounded-full w-full flex`}>
        
        {/* Sliding pill highlight */}
        <div
          className={`absolute top-1 bottom-1 w-[48%] rounded-full bg-neutral-800 transition-all duration-300
            ${!selected ? "left-1" : "left-[51%]"}`}
        />

        {/* Unread button */}
        <button
          onClick={() => handleSelect(false)}
          className={`flex-1 z-10 text-sm font-medium py-2 transition-colors ${
            selected
              ? "text-white"
              : "text-neutral-400"
          }`}
        >
          Unread
        </button>

        {/* Read button */}
        <button
          onClick={() => handleSelect(true)}
          className={`flex-1 z-10 text-sm font-medium py-2 transition-colors ${
            selected
              ? "text-white"
              : "text-neutral-400"
          }`}
        >
          Read
        </button>
      </div>
    </div>
  );
}
