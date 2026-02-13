import React, { useEffect, useRef, useState } from 'react';
import {
  INotificationReminder,
  ReminderOptionType,
  NotificationType,
  CustomUnitType,
} from '../../interfaces/notifications';
import { MdClose } from 'react-icons/md';
import { groupClassNames } from '../../utils';
import { useTranslation } from 'react-i18next';
import { formatReminderDisplay } from '../../utils/reminders';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownProps {
  label: string;
  currentLabel?: string;
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
  currentLabel,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="group flex items-center space-x-2 relative">
      <div className="w-full">
        <div className="text-xs text-surface-foreground mb-1">{label}</div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen((v) => !v)}
          className={groupClassNames(
            'w-full bg-surface border px-3 py-2 text-sm rounded-lg border-border',
            'flex items-center justify-between text-surface-foreground shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-accent'
          )}
        >
          <span>
            {currentLabel ||
              options.find((o) => o.value === value)?.label ||
              t('common.select_reminder')}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs"
          >
            ▾
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className={groupClassNames(
                'absolute z-50 bottom-full mb-1 w-full rounded-lg',
                'border border-border bg-surface text-surface-foreground',
                'shadow-lg max-h-40 overflow-y-auto'
              )}
            >
              {options.map((option) => {
                const displayText = option.custom
                  ? formatReminderDisplay(
                      {
                        value: option.value,
                        custom: option.custom,
                      } as INotificationReminder,
                      t
                    )
                  : option.label ||
                    (option.value.startsWith('CUSTOM_')
                      ? option.value.replace(
                          /CUSTOM_(\d+)_(\w+)_(.+)/,
                          (_, value, unit, types) => {
                            const typeArray = types.split(
                              '_'
                            ) as NotificationType[];
                            return formatReminderDisplay(
                              {
                                value: option.value,
                                custom: {
                                  value: parseInt(value),
                                  unit: unit as CustomUnitType,
                                  type: typeArray,
                                },
                              } as INotificationReminder,
                              t
                            );
                          }
                        )
                      : t(`reminders.options.${option.value}`));

                return (
                  <motion.div
                    key={option.value}
                    onClick={() => {
                      onChange?.(option.value);
                      setOpen(false);
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={groupClassNames(
                      'px-3 py-2 text-sm cursor-pointer rounded-md hover:bg-muted',
                      value === option.value && 'bg-surface font-medium'
                    )}
                  >
                    {displayText}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {onDelete && (
          <motion.div
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="mt-4"
          >
            <MdClose
              className="text-surface-foreground cursor-pointer hover:text-muted-foreground"
              size={22}
              onClick={onDelete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
