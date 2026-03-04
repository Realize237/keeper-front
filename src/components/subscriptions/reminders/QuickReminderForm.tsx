import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button';

interface QuickReminderOption {
  value: string;
  label: string;
  days: number;
}

interface QuickReminderFormProps {
  options: QuickReminderOption[];
  onSelect: (value: string) => void;
  onCustom: () => void;
  onCancel: () => void;
}

export const QuickReminderForm = ({
  options,
  onSelect,
  onCustom,
  onCancel,
}: QuickReminderFormProps) => {
  const { t } = useTranslation();

  if (options.length === 0) {
    return (
      <div className="bg-surface p-3 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">
          {t('reminders.text.new_reminder', 'New Reminder')}
        </h3>
        <div className="text-center py-4">
          <p className="text-muted-foreground mb-4">
            {t(
              'reminders.messages.too_soon',
              'Not enough time left to set reminders.'
            )}
          </p>
          <Button variant="secondary" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface p-3 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">
        {t('reminders.text.new_reminder', 'New Reminder')}
      </h3>
      <div className="flex gap-4 flex-wrap">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="p-3 rounded-xl border border-border hover:bg-muted transition"
          >
            {option.label}
          </button>
        ))}
        <button
          onClick={onCustom}
          className="p-3 rounded-xl border border-border hover:bg-muted transition"
        >
          {t('reminders.text.custom', 'Custom')}
        </button>
      </div>

      <div className="mt-4 flex gap-4">
        <Button variant="secondary" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
      </div>
    </div>
  );
};
