import { AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import ReminderModal from "../ui/ReminderModal";
import Dropdown from "./Dropdown";
import {
  INotificationReminder,
  ReminderOptions,
} from "../../interfaces/notifications";
import { Subscription } from "../../interfaces/subscription";
import { FiPlus } from "react-icons/fi";
import { getReminderDate } from "../../utils";

const NotificationReminder = ({
  subscription,
}: {
  subscription: Subscription;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [reminders, setReminders] = useState<INotificationReminder[]>([
    { value: "30 minutes before", id: crypto.randomUUID() },
  ]);

  const [newReminder, setNewReminder] = useState<INotificationReminder | null>(null);

  const handleAddReminder = () => {
    const newItem: INotificationReminder = {
      id: crypto.randomUUID(),
      value: "custom",
    };
    setReminders((prev) => [...prev, newItem]);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  const updateReminder = (id: string, data: INotificationReminder) => {
    setReminders((prev) =>
      prev.map((reminder) => (reminder.id === id ? { ...reminder, ...data } : reminder))
    );
  };

  const setReminder = useCallback(() => {
    const remindersWithDates = reminders.map((notification) => ({
      value: notification.value,
      reminderDate: getReminderDate(
        subscription.details.endDate,
        notification.value,
        notification.custom
      ),
      custom: notification.custom,
    }));
  }, [reminders, subscription]);

  const filteredReminderOptions = useMemo(
    () =>
      ReminderOptions.filter(
        (option) =>
          option.subscriptionType === "BOTH" ||
          option.subscriptionType === subscription.type
      ),
    [subscription]
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
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between w-full"
              >
                <div className="flex-1">
                  <Dropdown
                    label="Reminder"
                    options={filteredReminderOptions}
                    value={reminder.value}
                    onDelete={() => handleDeleteReminder(reminder.id)}
                    onChange={(value) => {
                      if (value === "Custom") {
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
            <button
              onClick={setReminder}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              Save changes
            </button>
          </div>
        </div>
      )}
      <AnimatePresence>
        {newReminder?.custom && (
          <ReminderModal
            item={newReminder.custom}
            onClose={() => setNewReminder(null)}
            onSave={(updated) => {
              updateReminder(newReminder.id, {
                ...newReminder,
                value: "Custom",
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
