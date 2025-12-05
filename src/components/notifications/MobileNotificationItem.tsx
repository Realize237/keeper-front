import { FiCheck, FiAlertTriangle, FiInfo, FiShoppingBag } from "react-icons/fi";

interface NotificationCardProps {
  title: string;
  message: string;
  timestamp: string;
  type: "success" | "error" | "warning" | "info" | "promo";
  image?: string; 
  onClick?: () => void;
}

const iconMap = {
  success: <FiCheck className="w-5 h-5 text-green-400" />,
  error: <FiAlertTriangle className="w-5 h-5 text-red-400" />,
  warning: <FiAlertTriangle className="w-5 h-5 text-yellow-400" />,
  info: <FiInfo className="w-5 h-5 text-blue-400" />,
  promo: <FiShoppingBag className="w-5 h-5 text-purple-400" />,
};

export default function NotificationCard({
  title,
  message,
  timestamp,
  type,
  image,
  onClick,
}: NotificationCardProps) {
  return (
    <div
      onClick={onClick}
      className="w-full p-4 bg-[#1f1f27] rounded-2xl flex gap-4 active:scale-[0.98] transition-transform"
    >
      {/* Icon Bubble */}
      <div className="w-12 h-12 rounded-full bg-[#2a2a35] flex items-center justify-center">
        {iconMap[type]}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white text-sm">{title}</h3>
          <span className="text-xs text-neutral-400">{timestamp}</span>
        </div>

        <p className="text-sm text-neutral-400 mt-1 leading-snug">{message}</p>

        {/* Optional image preview */}
        {image && (
          <div className="mt-3">
            <img
              src={image}
              alt="attachment"
              className="w-full h-28 object-cover rounded-xl"
            />
          </div>
        )}
      </div>
    </div>
  );
}
