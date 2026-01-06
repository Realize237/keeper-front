import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import ReminderModal from '../ui/ReminderModal';
import Dropdown from './Dropdown';
import {
  INotificationReminder,
  IReminderRequest,
  IReminderUpdate,
  NotificationType,
} from '../../interfaces/notifications';
import { Subscription } from '../../interfaces/subscription';
import { FiPlus } from 'react-icons/fi';
import {
  formatReminderDisplay,
  getReminderDate,
  getReminderString,
} from '../../utils/reminders';
import {
  useAddReminder,
  useDeleteReminder,
  useDeleteSubscriptionReminders,
  useUpdateSubscriptionReminders,
} from '../../hooks/useReminders';
import toast from 'react-hot-toast';
import { Button } from '../ui/Button';
import { ReminderOptions } from '../../constants';
import { useTranslation } from 'react-i18next';
import { getKeyFromValueUnit } from '../../utils/reminders';

const NotificationReminder = ({
  subscription,
}: {
  subscription: Subscription;
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [reminders, setReminders] = useState<INotificationReminder[]>([]);

  const [newReminder, setNewReminder] = useState<INotificationReminder | null>(
    null
  );

  const [reminderOptions, setReminderOptions] = useState(ReminderOptions);

  const initializeSubscriptionReminders = useCallback(() => {
    if (subscription.reminders && subscription.reminders.length) {
      const notificationReminders: INotificationReminder[] =
        subscription.reminders.map((reminder) => {
          const key = getKeyFromValueUnit(
            reminder.value,
            reminder.unit as moment.unitOfTime.DurationConstructor
          );
          const isCustom = !key; // if no predefined key found → custom

          const displayValue = isCustom
            ? getReminderString(
                reminder.value,
                reminder.unit as moment.unitOfTime.DurationConstructor,
                reminder.notificationType
              ).combinedKeyValue
            : key;

          // Add custom ones to dropdown if needed
          if (isCustom) {
            setReminderOptions((prev) => {
              if (prev.some((o) => o.value === displayValue)) return prev;
              return [
                ...prev,
                {
                  value: displayValue,
                  subscriptionType: 'BOTH' as const,
                  custom: {
                    unit: reminder.unit as moment.unitOfTime.DurationConstructor,
                    value: reminder.value,
                    type: reminder.notificationType || ['EMAIL'],
                  },
                },
              ];
            });
          }

          return {
            id: reminder.id.toString(),
            value: displayValue,
            custom: isCustom
              ? {
                  unit: reminder.unit as moment.unitOfTime.DurationConstructor,
                  value: reminder.value,
                  type: reminder.notificationType || ['EMAIL'],
                }
              : undefined,
          };
        });
      setReminders(notificationReminders);
    }
  }, [subscription]);

  useEffect(() => {
    initializeSubscriptionReminders();
  }, [initializeSubscriptionReminders]);

  const addReminderMutation = useAddReminder();
  const updateSubscriptionRemindersMutation = useUpdateSubscriptionReminders();
  const deleteSubscriptionRemindersMutation = useDeleteSubscriptionReminders();
  const deleteReminderMutation = useDeleteReminder();

  const handleAddReminder = () => {
    const newItem: INotificationReminder = {
      id: crypto.randomUUID(),
      value: 'CUSTOM',
    };
    setReminders((prev) => [...prev, newItem]);
  };

  const isReminderUpdated = useMemo(
    () =>
      subscription.reminders.length &&
      reminders.length <= subscription.reminders.length,
    [subscription, reminders]
  );

  const handleDeleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
    if (isReminderUpdated) {
      deleteReminderMutation.mutate(parseInt(id), {
        onSuccess: () => {
          toast.success(t('reminders.messages.deleted'));
        },
        onError: (error) => {
          toast.error(`${t('reminders.messages.error')}: ${error.message}`);
        },
      });
    }
  };

  const updateReminder = (id: string, data: INotificationReminder) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id ? { ...reminder, ...data } : reminder
      )
    );
  };

  const removeDuplicatesFromRemindersRequest = useCallback(() => {
    const existingReminderKeys = new Set(
      subscription.reminders.map(
        (r) => `${r.subscriptionId}-${r.id}-${r.value}`
      )
    );
    return reminders
      .map((reminder) => {
        const { unit, value } = getReminderDate(
          reminder.value,
          !!reminder.custom,
          reminder.custom
        );
        return {
          id: reminder.id,
          subscriptionId: subscription.id,
          unit,
          value,
          notificationType: reminder.custom?.type,
        };
      })
      .filter(
        (reminder) =>
          !existingReminderKeys.has(
            `${subscription.id}-${reminder.id}-${reminder.value}`
          )
      );
  }, [reminders, subscription]);

  const setReminder = useCallback(() => {
    const remindersRequest: IReminderRequest[] =
      removeDuplicatesFromRemindersRequest().map((reminder) => ({
        ...reminder,
        id: undefined,
      }));
    addReminderMutation.mutate(remindersRequest, {
      onSuccess: () => {
        toast.success(t('reminders.messages.added'));
      },
      onError: (error) => {
        toast.error(`${t('reminders.messages.error')}: ${error.message}`);
      },
    });
  }, [addReminderMutation, removeDuplicatesFromRemindersRequest, t]);

  const deleteSubscriptionReminders = useCallback(() => {
    deleteSubscriptionRemindersMutation.mutate(subscription.id, {
      onSuccess: () => {
        toast.success(t('reminders.messages.deleted'));
      },
      onError: (error) => {
        toast.error(`${t('reminders.messages.error')}: ${error.message}`);
      },
    });
  }, [deleteSubscriptionRemindersMutation, subscription, t]);

  const updateSubscriptionReminders = useCallback(() => {
    const updatedReminders: IReminderUpdate[] = reminders.map((reminder) => {
      const { unit, value } = getReminderDate(
        reminder.value,
        !!reminder.custom,
        reminder.custom
      );
      return {
        id: parseInt(reminder.id),
        subscriptionId: subscription.id,
        unit,
        value,
        notificationType: reminder.custom?.type,
        isCustom: !!reminder.custom,
      };
    });
    updateSubscriptionRemindersMutation.mutate(
      { subscriptionId: subscription.id, updatedReminders },
      {
        onSuccess: () => {
          toast.success(t('reminders.messages.updated'));
        },
        onError: (error) => {
          toast.error(`${t('reminders.messages.error')}: ${error.message}`);
        },
      }
    );
  }, [updateSubscriptionRemindersMutation, subscription, reminders, t]);

  const filteredReminderOptions = useMemo(
    () =>
      reminderOptions.filter(
        (option) =>
          option.subscriptionType === 'BOTH' ||
          option.subscriptionType === subscription.type
      ),
    [subscription, reminderOptions]
  );

  return (
    <div className="w">
      <button
        onClick={() => setExpanded((x) => !x)}
        className="w-full flex text-sm items-center text-[#838383] justify-between hover:bg-neutral-700 transition"
      >
        {expanded ? t('reminders.actions.hide') : t('reminders.actions.edit')}
      </button>

      {expanded && (
        <div
          className="mt-4 space-y-4 animate-fadeIn"
          style={{ animation: 'fadeIn .25s ease' }}
        >
          {subscription.reminders.length > 0 && (
            <Button
              className="bg-red-500 text-xs text-white"
              onClick={deleteSubscriptionReminders}
            >
              {t('reminders.actions.delete')}
            </Button>
          )}
          <div className="space-y-3">
            {reminders.map((reminder, index) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between w-full"
              >
                <div className="flex-1">
                  <Dropdown
                    label={`${t('reminders.text.reminder')} ${index + 1}`}
                    options={filteredReminderOptions}
                    value={reminder.value}
                    currentLabel={
                      reminder.custom
                        ? formatReminderDisplay(reminder, t)
                        : reminder.value.startsWith('CUSTOM_')
                          ? (() => {
                              const match = reminder.value.match(
                                /CUSTOM_(\d+)_(\w+)_(.+)/
                              );
                              if (match) {
                                const [, value, unit, types] = match;
                                const typeArray = types.split(
                                  '_'
                                ) as NotificationType[];
                                return formatReminderDisplay(
                                  {
                                    value: reminder.value,
                                    custom: {
                                      value: parseInt(value),
                                      unit: unit as moment.unitOfTime.DurationConstructor,
                                      type: typeArray,
                                    },
                                  } as INotificationReminder,
                                  t
                                );
                              }
                              return reminder.value;
                            })()
                          : t(`reminders.options.${reminder.value}`)
                    }
                    onDelete={() => handleDeleteReminder(reminder.id)}
                    onChange={(value) => {
                      if (value === 'CUSTOM') {
                        setNewReminder({
                          id: reminder.id,
                          value: reminder.value,
                          custom: {
                            value: 30,
                            unit: 'minutes',
                            type: ['EMAIL'],
                          },
                        });
                      } else {
                        updateReminder(reminder.id, {
                          id: reminder.id,
                          value,
                        });
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handleAddReminder}
              className="text-blue-400 capitalize flex items-center space-x-4 hover:underline text-sm"
            >
              {t('common.add')} <FiPlus />
            </button>
            {reminders.length > 0 && (
              <button
                onClick={
                  isReminderUpdated ? updateSubscriptionReminders : setReminder
                }
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs"
              >
                {!isReminderUpdated
                  ? t('reminders.actions.save')
                  : t('reminders.actions.update')}
              </button>
            )}
          </div>
        </div>
      )}
      <AnimatePresence>
        {newReminder?.custom && (
          <ReminderModal
            item={newReminder.custom}
            onClose={() => setNewReminder(null)}
            onSave={(updated) => {
              const { combinedKeyValue } = getReminderString(
                updated.value,
                updated.unit,
                updated.type
              );

              setReminderOptions((prev) => {
                if (prev.some((o) => o.value === combinedKeyValue)) return prev;
                return [
                  ...prev,
                  {
                    value: combinedKeyValue,
                    subscriptionType: 'BOTH',
                    custom: updated,
                  },
                ];
              });
              updateReminder(newReminder.id, {
                ...newReminder,
                value: combinedKeyValue,
                custom: updated,
              });
              setNewReminder(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationReminder;
