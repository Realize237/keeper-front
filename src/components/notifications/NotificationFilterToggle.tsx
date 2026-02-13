import { useState } from 'react';
import {
  NotificationStatus,
  type NotifStatus,
} from '../../interfaces/notifications';
import { useTranslation } from 'react-i18next';

export default function NotificationFilterToggle({
  onChange,
  style,
}: {
  onChange: (status: NotifStatus) => void;
  style?: string;
}) {
  const [selected, setSelected] = useState<NotifStatus>(
    NotificationStatus.UNREAD as NotifStatus
  );
  const { t } = useTranslation();

  const handleSelect = (value: keyof typeof NotificationStatus) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={`relative ${style} bg-surface border-border rounded-full text-surface-foreground w-full flex`}
      >
        <div
          className={`absolute top-1 bottom-1 w-[48%] rounded-full bg-muted  border transition-all duration-300
            ${selected === NotificationStatus.UNREAD ? 'left-1' : 'left-[51%]'}`}
        />

        <button
          onClick={() => handleSelect(NotificationStatus.UNREAD as NotifStatus)}
          className={`flex-1 z-10 text-sm font-medium py-2 transition-colors ${
            selected ? 'text-surface-foreground' : 'text-muted-foreground'
          }`}
        >
          {t('notifications.filters.unread')}
        </button>

        <button
          onClick={() => handleSelect(NotificationStatus.READ as NotifStatus)}
          className={`flex-1 z-10 text-sm font-medium py-2 transition-colors ${
            selected ? 'text-surface-foreground' : 'text-muted-foreground'
          }`}
        >
          {t('notifications.filters.read')}
        </button>
      </div>
    </div>
  );
}
