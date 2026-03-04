import { useTranslation } from 'react-i18next';
import { NotificationType } from '../../../interfaces/notifications';
import { Tooltip } from '../../ui/Tooltip';

interface NotificationMethodSelectorProps {
  selectedTypes: NotificationType[];
  onToggle: (type: NotificationType) => void;
  disabled?: boolean;
}

export const NotificationMethodSelector = ({
  selectedTypes,
  onToggle,
  disabled = false,
}: NotificationMethodSelectorProps) => {
  const { t } = useTranslation();

  const methods: NotificationType[] = ['EMAIL', 'SYSTEM', 'WHATSAPP', 'SMS'];

  return (
    <div className="flex gap-4 flex-wrap">
      {methods.map((method) => {
        const isPremium = ['WHATSAPP', 'SMS', 'SYSTEM'].includes(method);
        const button = (
          <button
            key={method}
            onClick={() => !isPremium && !disabled && onToggle(method)}
            disabled={isPremium || disabled}
            className={`px-3 py-2 rounded-xl border border-border ${
              selectedTypes.includes(method)
                ? 'bg-accent text-primary-foreground'
                : 'bg-muted'
            } ${
              isPremium || disabled
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:bg-muted/70 cursor-pointer'
            } flex items-center gap-1 transition`}
          >
            {method}
            {['WHATSAPP', 'SMS', 'SYSTEM'].includes(method) && <span>👑</span>}
          </button>
        );

        return isPremium ? (
          <Tooltip
            key={method}
            content={t(
              'reminders.upgrade_required',
              'Upgrade to Premium to unlock this feature'
            )}
          >
            {button}
          </Tooltip>
        ) : (
          button
        );
      })}
    </div>
  );
};
