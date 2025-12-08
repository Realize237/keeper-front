import { useState } from "react";
import { NotificationStatus, type NotifStatus } from "../../interfaces/notifications";

export default function NotificationFilterToggle({
  onChange,
  style
}: {
  onChange: (status: NotifStatus) => void;
  style?: string;
}) {
  const [selected, setSelected] = useState<NotifStatus>(NotificationStatus.UNREAD as NotifStatus);

  const handleSelect = (value: keyof typeof NotificationStatus) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className={`relative ${style} bg-neutral-700 rounded-full w-full flex`}>
        
        {/* Sliding pill highlight */}
        <div
          className={`absolute top-1 bottom-1 w-[48%] rounded-full bg-neutral-800 transition-all duration-300
            ${selected === NotificationStatus.UNREAD ? "left-1" : "left-[51%]"}`}
        />

        {/* Unread button */}
        <button
          onClick={() => handleSelect(NotificationStatus.UNREAD as NotifStatus)}
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
          onClick={() => handleSelect(NotificationStatus.READ as NotifStatus)}
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
