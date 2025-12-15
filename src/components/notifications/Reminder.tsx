/* eslint-disable react-hooks/set-state-in-effect */
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import ReminderModal from "../ui/ReminderModal";
import Dropdown from "./Dropdown";
import {
  INotificationReminder,
  IReminderRequest,
  IReminderUpdate,
  NotifType,
  ReminderOptions,
} from "../../interfaces/notifications";
import { Subscription } from "../../interfaces/subscription";
import { FiPlus } from "react-icons/fi";
import { getReminderDate, getReminderString } from "../../utils";
import {
  useAddReminder,
  useDeleteReminder,
  useDeleteSubscriptionReminders,
  useUpdateSubscriptionReminders,
} from "../../hooks/useReminders";
import toast from "react-hot-toast";
import { Button } from "../ui/Button";

const NotificationReminder = ({
  subscription,
}: {
  subscription: Subscription;
}) => {
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
          const { combinedKeyValue, isCustom } = getReminderString(
            reminder.value,
            reminder.unit as moment.unitOfTime.DurationConstructor,
            reminder.notificationType
          );
          const reminderString = combinedKeyValue;
          setReminderOptions((prev) => {
            const exists = prev.some(
              (option) => option.value.trim() === reminderString.trim()
            );
            if (exists) return prev;
            return [
              ...prev,
              { value: reminderString, subscriptionType: "BOTH" },
            ];
          });

          return {
            id: reminder.id.toString(),
            value: reminderString,
            custom: isCustom
              ? {
                  unit: reminder.unit as moment.unitOfTime.DurationConstructor,
                  value: reminder.value,
                  type: reminder.notificationType as NotifType[],
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
  const deleteAReminderMutation = useDeleteReminder();

  const handleAddReminder = () => {
    const newItem: INotificationReminder = {
      id: crypto.randomUUID(),
      value: "custom",
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
      deleteAReminderMutation.mutate(parseInt(id), {
         onSuccess: () => {
          toast.success("Reminder deleted successfully !");
        },
        onError: (error) => {
          toast.error(`An error occured: ${error.message}`);
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
          notificationType: reminder.custom?.type
        };
      })
      .filter(
        (reminder) =>
          !existingReminderKeys.has(
            `${subscription.id}-${reminder.id}-${reminder.value}`
          ))
      ;
  }, [reminders, subscription]);

  const setReminder = useCallback(() => {
    const remindersRequest: IReminderRequest[] =
      removeDuplicatesFromRemindersRequest().map((reminder) => ({...reminder, id:undefined}));
      addReminderMutation.mutate(remindersRequest, {
      onSuccess: () => {
        toast.success("Reminder set successfully !");
      },
      onError: (error) => {
        toast.error(`An error occured: ${error.message}`);
      },
    });
  }, [addReminderMutation, removeDuplicatesFromRemindersRequest]);

  const deleteSubscriptionReminders = useCallback(() => {
    deleteSubscriptionRemindersMutation.mutate(subscription.id, {
      onSuccess: () => {
        toast.success("Reminders deleted successfully !");
      },
      onError: (error) => {
        toast.error(`An error occured: ${error.message}`);
      },
    });
  }, [deleteSubscriptionRemindersMutation, subscription]);

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
          toast.success("Reminders updated successfully !");
        },
        onError: (error) => {
          toast.error(`An error occured: ${error.message}`);
        },
      }
    );
  }, [updateSubscriptionRemindersMutation, subscription, reminders]);

  const filteredReminderOptions = useMemo(
    () =>
      reminderOptions.filter(
        (option) =>
          option.subscriptionType === "BOTH" ||
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
        {expanded ? "Hide options ▲" : "Edit options ▼"}
      </button>

      {expanded && (
        <div
          className="mt-4 space-y-4 animate-fadeIn"
          style={{ animation: "fadeIn .25s ease" }}
        >
          {subscription.reminders.length > 0 && (
            <Button
              className="bg-red-500 text-xs text-white"
              onClick={deleteSubscriptionReminders}
            >
              Delete Reminders
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
                    label={`Reminder ${index+1}`}
                    options={filteredReminderOptions}
                    value={reminder.value}
                    onDelete={() => handleDeleteReminder(reminder.id)}
                    onChange={(value) => {
                      if (value.toLowerCase() === "custom") {
                        setNewReminder({
                          id: reminder.id,
                          value: reminder.value,
                          custom: {
                            value: 30,
                            unit: "minutes",
                            type: ["EMAIL"],
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
              className="text-blue-400 flex items-center space-x-4 hover:underline text-sm"
            >
              Add <FiPlus />
            </button>
            {reminders.length > 0 && <button
              onClick={
                isReminderUpdated ? updateSubscriptionReminders : setReminder
              }
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs"
            >
              {!isReminderUpdated ? "Save" : "Update"}
            </button>}
          </div>
        </div>
      )}
      <AnimatePresence>
        {newReminder?.custom && (
          <ReminderModal
            item={newReminder.custom}
            onClose={() => setNewReminder(null)}
            onSave={(updated) => {
              const reminderString = getReminderString(
                updated.value,
                updated.unit,
                updated.type
              ).combinedKeyValue;
              setReminderOptions((prev) => [
                ...prev,
                {
                  value: reminderString,
                  subscriptionType: "BOTH",
                },
              ]);
              updateReminder(newReminder.id, {
                ...newReminder,
                value: reminderString,
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
