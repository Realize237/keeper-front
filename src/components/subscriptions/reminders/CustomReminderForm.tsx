import { useTranslation } from 'react-i18next';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import {
  CustomUnitType,
  NotificationType,
} from '../../../interfaces/notifications';
import Button from '../../ui/Button';
import { Select } from '../../ui/Select';
import Spinner from '../../ui/Spinner';
import { NotificationMethodSelector } from './NotificationMethodSelector';

interface CustomReminderFormProps {
  customValue: number;
  customUnit: CustomUnitType;
  selectedNotificationTypes: NotificationType[];
  maxCustomValue: number;
  isUnitValid: boolean;
  isLoading: boolean;
  isEditing: boolean;
  onValueChange: (value: number) => void;
  onUnitChange: (unit: CustomUnitType) => void;
  onNotificationTypeToggle: (type: NotificationType) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const CustomReminderForm = ({
  customValue,
  customUnit,
  selectedNotificationTypes,
  maxCustomValue,
  isUnitValid,
  isLoading,
  isEditing,
  onValueChange,
  onUnitChange,
  onNotificationTypeToggle,
  onSave,
  onCancel,
}: CustomReminderFormProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-surface p-4 rounded-xl mt-4 space-y-4 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
          <Spinner className="border-primary" />
        </div>
      )}
      <h3 className="text-lg font-semibold">
        {isEditing
          ? t('reminders.text.edit_reminder', 'Edit Reminder')
          : t('reminders.text.custom_reminder', 'Custom Reminder')}
      </h3>

      <NotificationMethodSelector
        selectedTypes={selectedNotificationTypes}
        onToggle={onNotificationTypeToggle}
        disabled={isLoading}
      />

      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={() => onValueChange(Math.max(1, customValue - 1))}
          disabled={customValue <= 1 || !isUnitValid || isLoading}
          className="px-2 py-3 border border-border rounded-xl w-1/4 flex items-center justify-center hover:bg-muted transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaMinus />
        </button>
        <input
          type="number"
          value={customValue}
          min={1}
          max={maxCustomValue > 0 ? maxCustomValue : 1}
          disabled={!isUnitValid || isLoading}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 1;
            const max = maxCustomValue > 0 ? maxCustomValue : 1;
            onValueChange(Math.min(max, Math.max(1, val)));
          }}
          className="w-12 text-center rounded-xl flex-1 px-2 py-3 border border-border bg-background disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={() =>
            onValueChange(Math.min(maxCustomValue, customValue + 1))
          }
          disabled={customValue >= maxCustomValue || !isUnitValid || isLoading}
          className="px-2 py-3 border border-border rounded-xl w-1/4 text-center flex items-center justify-center hover:bg-muted transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPlus />
        </button>
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        {isUnitValid
          ? t('reminders.text.max_value', {
              maxCustomValue,
              customUnit: t(`reminders.units.${customUnit}`),
            })
          : t('reminders.text.insufficient_time', {
              customUnit: t(`reminders.units.${customUnit}`),
            })}
      </p>

      <Select
        value={customUnit}
        onChange={(newUnit) => onUnitChange(newUnit as CustomUnitType)}
        options={[
          { value: 'days', label: t('reminders.units.days', 'Days') },
          { value: 'weeks', label: t('reminders.units.weeks', 'Weeks') },
          { value: 'months', label: t('reminders.units.months', 'Months') },
        ]}
        disabled={isLoading}
        className="mt-2"
      />

      <div className="flex justify-end gap-4 mt-4">
        <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
          {t('common.cancel')}
        </Button>
        <Button
          onClick={onSave}
          disabled={
            selectedNotificationTypes.length === 0 ||
            isLoading ||
            !isUnitValid ||
            customValue > maxCustomValue ||
            customValue < 1
          }
        >
          {isLoading ? (
            <Spinner className="border-primary" />
          ) : (
            t('common.save')
          )}
        </Button>
      </div>
    </div>
  );
};
