import { FaBell, FaPlus, FaTrash } from 'react-icons/fa';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useSubscriptionsDetails } from '../../hooks/useSubscriptions';
import {
  useAddReminder,
  useDeleteReminder,
  useDeleteSubscriptionReminders,
  useUpdateReminder,
} from '../../hooks/useReminders';
import {
  CustomUnitType,
  INotificationReminder,
  IReminderRequest,
  IReminderUpdate,
  NotificationType,
} from '../../interfaces/notifications';
import {
  getReminderDate,
  getReminderString,
  getKeyFromValueUnit,
} from '../../utils/reminders';
import {
  getDaysUntilEnd,
  getWeekInfo,
  getQuickReminderOptions,
  getMaxCustomValue,
} from '../../utils/reminderHelpers';
import { Avatar } from '../ui/Avatar';
import Spinner from '../ui/Spinner';
import { ReminderWeekCalendar } from './reminders/ReminderWeekCalendar';
import { QuickReminderForm } from './reminders/QuickReminderForm';
import { CustomReminderForm } from './reminders/CustomReminderForm';
import { ReminderList } from './reminders/ReminderList';
import { Tooltip } from '../ui/Tooltip';

const ManageReminders = ({
  subscriptionId,
  isExpired = false,
}: {
  subscriptionId: number;
  isExpired?: boolean;
}) => {
  const { t } = useTranslation();
  const {
    data: subscriptionDetails,
    isLoading,
    isFetching,
    refetch,
  } = useSubscriptionsDetails(subscriptionId);

  const [addReminder, setAddReminder] = useState<boolean>(false);
  const [showCustom, setShowCustom] = useState<boolean>(false);
  const [editingReminder, setEditingReminder] =
    useState<INotificationReminder | null>(null);
  const [customValue, setCustomValue] = useState<number>(1);
  const [customUnit, setCustomUnit] = useState<CustomUnitType>('days');
  const [selectedNotificationTypes, setSelectedNotificationTypes] = useState<
    NotificationType[]
  >(['EMAIL']);

  const addReminderMutation = useAddReminder();
  const updateReminderMutation = useUpdateReminder();
  const deleteSubscriptionRemindersMutation = useDeleteSubscriptionReminders();
  const deleteReminderMutation = useDeleteReminder();

  const isAnyMutationLoading =
    addReminderMutation.isPending ||
    updateReminderMutation.isPending ||
    deleteSubscriptionRemindersMutation.isPending ||
    deleteReminderMutation.isPending ||
    isFetching;

  const daysUntilEnd = useMemo(() => {
    if (!subscriptionDetails?.details.endDate) return 0;
    return getDaysUntilEnd(new Date(subscriptionDetails.details.endDate));
  }, [subscriptionDetails]);

  const weekDays = useMemo(() => {
    if (!subscriptionDetails?.details.endDate) return [];
    return getWeekInfo(
      new Date(subscriptionDetails.details.endDate),
      (key: string) => t(key)
    );
  }, [subscriptionDetails, t]);

  const quickReminderOptions = useMemo(() => {
    return getQuickReminderOptions(daysUntilEnd, (key: string) => t(key));
  }, [daysUntilEnd, t]);

  const maxCustomValue = useMemo(() => {
    return getMaxCustomValue(daysUntilEnd, customUnit);
  }, [daysUntilEnd, customUnit]);

  const isUnitValid = useMemo(() => {
    return maxCustomValue >= 1;
  }, [maxCustomValue]);

  const reminders = useMemo(() => {
    if (
      subscriptionDetails?.reminders &&
      subscriptionDetails.reminders.length > 0
    ) {
      return subscriptionDetails.reminders.map((reminder) => {
        const key = getKeyFromValueUnit(
          reminder.value,
          reminder.unit as CustomUnitType
        );
        const isCustom = !key;

        const displayValue = isCustom
          ? getReminderString(
              reminder.value,
              reminder.unit as CustomUnitType,
              reminder.notificationType || ['EMAIL']
            ).combinedKeyValue
          : key;

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
    }
    return [];
  }, [subscriptionDetails]);

  const isReminderUpdated = useMemo(
    () =>
      subscriptionDetails?.reminders.length &&
      reminders.length <= subscriptionDetails.reminders.length,
    [subscriptionDetails, reminders]
  );

  const handleAddQuickReminder = (value: string) => {
    if (!subscriptionDetails) return;

    const newItem: INotificationReminder = {
      id: crypto.randomUUID(),
      value,
    };
    setAddReminder(false);
    saveNewReminder(newItem);
  };

  const handleAddCustomReminder = () => {
    if (!subscriptionDetails) return;

    const { combinedKeyValue } = getReminderString(
      customValue,
      customUnit,
      selectedNotificationTypes
    );

    const newItem: INotificationReminder = {
      id: crypto.randomUUID(),
      value: combinedKeyValue,
      custom: {
        value: customValue,
        unit: customUnit,
        type: selectedNotificationTypes,
      },
    };

    saveNewReminder(newItem);
  };

  const handleEditReminder = (reminder: INotificationReminder) => {
    setEditingReminder(reminder);
    setAddReminder(true);
    setShowCustom(true);

    if (reminder.custom) {
      setCustomValue(reminder.custom.value);
      setCustomUnit(reminder.custom.unit);
      setSelectedNotificationTypes(reminder.custom.type);
    } else {
      const option = quickReminderOptions.find(
        (o) => o.value === reminder.value
      );
      if (option) {
        setCustomValue(option.days);
        setCustomUnit('days');
        setSelectedNotificationTypes(['EMAIL']);
      }
    }
  };

  const handleUpdateReminder = () => {
    if (!editingReminder || !subscriptionDetails) return;

    const { combinedKeyValue } = getReminderString(
      customValue,
      customUnit,
      selectedNotificationTypes
    );

    const { unit, value } = getReminderDate(combinedKeyValue, true, {
      value: customValue,
      unit: customUnit,
      type: selectedNotificationTypes,
    });

    const reminderUpdate: IReminderUpdate = {
      id: parseInt(editingReminder.id),
      subscriptionId: subscriptionDetails.id,
      unit,
      value,
      notificationType: selectedNotificationTypes,
    };

    updateReminderMutation.mutate(reminderUpdate, {
      onSuccess: () => {
        toast.success(t('reminders.messages.updated'));
        setShowCustom(false);
        setAddReminder(false);
        setEditingReminder(null);
        refetch();
      },
      onError: (error) => {
        toast.error(`${t('reminders.messages.error')}: ${error.message}`);
      },
    });
  };

  const saveNewReminder = (reminder: INotificationReminder) => {
    if (!subscriptionDetails) return;

    const { unit, value } = getReminderDate(
      reminder.value,
      !!reminder.custom,
      reminder.custom
    );

    const reminderRequest: IReminderRequest = {
      subscriptionId: subscriptionDetails.id,
      unit,
      value,
      notificationType: reminder.custom?.type,
    };

    addReminderMutation.mutate([reminderRequest], {
      onSuccess: () => {
        toast.success(t('reminders.messages.added'));
        refetch();
      },
      onError: (error) => {
        toast.error(`${t('reminders.messages.error')}: ${error.message}`);
      },
    });
  };

  const handleDeleteReminder = (id: string) => {
    if (isReminderUpdated) {
      deleteReminderMutation.mutate(parseInt(id), {
        onSuccess: () => {
          toast.success(t('reminders.messages.deleted'));
          refetch();
        },
        onError: (error) => {
          toast.error(`${t('reminders.messages.error')}: ${error.message}`);
        },
      });
    }
  };

  const deleteAllReminders = () => {
    if (!subscriptionDetails) return;

    deleteSubscriptionRemindersMutation.mutate(subscriptionDetails.id, {
      onSuccess: () => {
        toast.success(t('reminders.messages.deleted'));
        refetch();
      },
      onError: (error) => {
        toast.error(`${t('reminders.messages.error')}: ${error.message}`);
      },
    });
  };

  const toggleNotificationType = (type: NotificationType) => {
    setSelectedNotificationTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleUnitChange = (newUnit: CustomUnitType) => {
    setCustomUnit(newUnit);

    const newMax = getMaxCustomValue(daysUntilEnd, newUnit);

    if (newMax === 0) {
      setCustomValue(1);
    } else if (customValue > newMax) {
      setCustomValue(newMax);
    } else {
      setCustomValue(1);
    }
  };

  const handleCancel = () => {
    setShowCustom(false);
    setAddReminder(false);
    setEditingReminder(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner className="border-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Avatar
          size="xl"
          src={subscriptionDetails?.details.iconUrl}
          name={subscriptionDetails?.details.name}
        />
        <div className="flex flex-col ">
          <h3 className="text-lg font-semibold">
            {subscriptionDetails?.details.name}
          </h3>
          <p className="text-2xl font-bold text-accent">
            ${subscriptionDetails?.price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between ">
        <h3 className="text-xl font-bold ">
          {t('subscription_details.reminders.title')}
        </h3>
        <div className="flex gap-2">
          {reminders.length > 0 &&
            (deleteSubscriptionRemindersMutation.isPending ? (
              <Spinner className="border-primary" />
            ) : (
              <button
                onClick={deleteAllReminders}
                title={t('reminders.actions.delete', 'Delete all reminders')}
                disabled={isAnyMutationLoading}
                className="flex items-center bg-danger/20 text-danger rounded-full p-2 cursor-pointer hover:bg-danger/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaTrash />
              </button>
            ))}
          <Tooltip
            content={
              isExpired
                ? t(
                    'reminders.messages.subscription_expired',
                    'Subscription expired'
                  )
                : t('reminders.actions.edit', 'Add reminder')
            }
            disabled={!isExpired}
          >
            <button
              onClick={() => setAddReminder(true)}
              title={t('reminders.actions.add', 'Add reminder')}
              disabled={isAnyMutationLoading || isExpired}
              className="flex items-center bg-primary rounded-full p-2 cursor-pointer hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed!"
            >
              <FaPlus className="text-primary-foreground" />
            </button>
          </Tooltip>
        </div>
      </div>

      <ReminderWeekCalendar weekDays={weekDays} />

      {reminders.length === 0 && !addReminder && !isFetching && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="bg-muted p-4 rounded-full mb-4">
            <FaBell className="text-2xl text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            {t('reminders.messages.no_reminders', 'No reminders set yet.')}
          </p>
        </div>
      )}

      {reminders.length === 0 && !addReminder && isFetching && (
        <div className="flex items-center justify-center py-10">
          <Spinner className="border-primary" />
        </div>
      )}

      {addReminder && !showCustom && (
        <QuickReminderForm
          options={quickReminderOptions}
          onSelect={handleAddQuickReminder}
          onCustom={() => setShowCustom(true)}
          onCancel={handleCancel}
        />
      )}

      {!addReminder && reminders.length > 0 && (
        <ReminderList
          reminders={reminders}
          endDate={subscriptionDetails?.details.endDate || new Date()}
          isFetching={isFetching}
          isAnyMutationLoading={isAnyMutationLoading}
          deletingReminderId={
            deleteReminderMutation.isPending
              ? editingReminder?.id || null
              : null
          }
          editingReminderId={
            updateReminderMutation.isPending
              ? editingReminder?.id || null
              : null
          }
          onEdit={handleEditReminder}
          onDelete={handleDeleteReminder}
        />
      )}

      {showCustom && (
        <CustomReminderForm
          customValue={customValue}
          customUnit={customUnit}
          selectedNotificationTypes={selectedNotificationTypes}
          maxCustomValue={maxCustomValue}
          isUnitValid={isUnitValid}
          isLoading={isAnyMutationLoading}
          isEditing={!!editingReminder}
          onValueChange={setCustomValue}
          onUnitChange={handleUnitChange}
          onNotificationTypeToggle={toggleNotificationType}
          onSave={
            editingReminder ? handleUpdateReminder : handleAddCustomReminder
          }
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ManageReminders;
