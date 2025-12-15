import { motion } from "framer-motion";
import Dropdown from "../notifications/Dropdown";
import { useMemo, useState } from "react";
import {
  ICustomReminder,
  CustomUnits,
  CustomUnitType,
  NotificationType,
  NotifType,
} from "../../interfaces/notifications";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { Button } from "./Button";

interface CustomModalProps {
  item: ICustomReminder;
  onClose: () => void;
  onSave: (data: ICustomReminder) => void;
}

const ReminderModal: React.FC<CustomModalProps> = ({
  item,
  onClose,
  onSave,
}) => {
  const [custom, setCustom] = useState<ICustomReminder>(
    item as ICustomReminder
  );
  const reminderValueError = useMemo(() => {
    if (Number(custom.value) < 30 && custom.unit == CustomUnits.MINS)
      return "Reminder should be greater than 30 minutes";
    return null;
  }, [custom.value, custom.unit]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 w-80 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4">Custom reminder</h3>

        <div className="space-y-3">
          <label className="text-xs text-gray-500 mb-1">
            Notification type
          </label>
          <MultiSelectDropdown
            options={Object.values(NotificationType).map((type) => ({
              value: type,
              label: type,
            }))}
            selected={custom.type}
            onChange={(values) =>
              setCustom({ ...custom, type: values as NotifType[] })
            }
          />

          <input
            type="number"
            value={custom.value}
            min={30}
            onChange={(e) =>
              setCustom({ ...custom, value: Number(e.target.value) })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
          {reminderValueError && (
            <div className="text-red-500 text-xs">{reminderValueError}</div>
          )}

          <Dropdown
            label="Unit"
            options={Object.values(CustomUnits).map((notification) => ({
              value: notification,
              subscriptionType: "BOTH",
            }))}
            value={custom.unit}
            onChange={(val) =>
              setCustom({ ...custom, unit: val as CustomUnitType })
            }
          />
        </div>

        <div className="flex justify-between mt-5">
          <Button className="bg-transparent" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!reminderValueError) {
                onSave(custom);
              }
            }}
            className="px-5 py-2 text-neutral-800 hover:opacity-70 rounded-lg"
          >
            Done
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReminderModal;
