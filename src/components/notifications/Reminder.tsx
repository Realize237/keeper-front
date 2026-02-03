import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReminderModal from '../ui/ReminderModal';
import Dropdown from './Dropdown';
import {
  CustomUnitType,
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
import { ReminderOptions } from '../../constants';
import { useTranslation } from 'react-i18next';
import { getKeyFromValueUnit } from '../../utils/reminders';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Spinner from '../ui/Spinner';

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
            reminder.unit as CustomUnitType
          );
          const isCustom = !key; // if no predefined key found → custom

          const displayValue = isCustom
            ? getReminderString(
                reminder.value,
                reminder.unit as CustomUnitType,
                reminder.notificationType
              ).combinedKeyValue
            : key;

          if (isCustom) {
            setReminderOptions((prev) => {
              if (prev.some((o) => o.value === displayValue)) return prev;
              return [
                ...prev,
                {
                  value: displayValue,
                  subscriptionType: 'BOTH' as const,
                  custom: {
                    unit: reminder.unit as CustomUnitType,
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
                  unit: reminder.unit as CustomUnitType,
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

  const isAnyMutationLoading =
    addReminderMutation.isPending ||
    updateSubscriptionRemindersMutation.isPending ||
    deleteSubscriptionRemindersMutation.isPending ||
    deleteReminderMutation.isPending;

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
        setReminders([]);
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
    <div className=" flex flex-col ">
      <button
        onClick={() => setExpanded((x) => !x)}
        className="
text-right
     p-1
      absolute
      right-0 
      top-0
      rounded-full
      bg-deep-teal hover:bg-deep-teal/90
      text-sm text-white
      transition
    "
      >
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {expanded && (
        <motion.div
          className="mt-10 space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {reminders.length > 0 && (
            <button
              onClick={deleteSubscriptionReminders}
              disabled={isAnyMutationLoading}
              className={`
                w-full py-2 px-2
                bg-red-500/20 text-red-500
                rounded-lg
                text-xs font-medium
                hover:bg-red-500/30
                transition
                flex items-center justify-center gap-2
                ${isAnyMutationLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {deleteSubscriptionRemindersMutation.isPending ? (
                <>
                  <Spinner />
                  {t('common.loading')}
                </>
              ) : (
                t('reminders.actions.delete')
              )}
            </button>
          )}

          <div className="space-y-3">
            {reminders.map((reminder, index) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between w-full bg-gray-900/20 px-4 py-2 rounded-xl shadow-sm"
              >
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
                                    unit: unit as CustomUnitType,
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
                        custom: { value: 30, unit: 'minutes', type: ['EMAIL'] },
                      });
                    } else {
                      updateReminder(reminder.id, { id: reminder.id, value });
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleAddReminder}
              className="
            flex items-center gap-2 px-3 py-1
            text-deep-teal text-sm
            rounded-lg hover:bg-gray-800/40
            transition
          "
            >
              {t('common.add')} <FiPlus />
            </button>

            {reminders.length > 0 && (
              <button
                onClick={
                  isReminderUpdated ? updateSubscriptionReminders : setReminder
                }
                disabled={isAnyMutationLoading}
                className={`
                  px-4 py-2 rounded-lg
                  bg-deep-teal hover:bg-deep-teal/90
                  text-white text-sm font-medium
                  transition
                  flex items-center justify-center gap-2
                  ${isAnyMutationLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {addReminderMutation.isPending ||
                updateSubscriptionRemindersMutation.isPending ? (
                  <>
                    <Spinner />
                    {t('common.loading')}
                  </>
                ) : !isReminderUpdated ? (
                  t('reminders.actions.save')
                ) : (
                  t('reminders.actions.update')
                )}
              </button>
            )}
          </div>
        </motion.div>
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
