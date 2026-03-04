interface WeekDay {
  label: string;
  date: number;
  fullDate: Date;
  active: boolean;
}

interface ReminderWeekCalendarProps {
  weekDays: WeekDay[];
}

export const ReminderWeekCalendar = ({
  weekDays,
}: ReminderWeekCalendarProps) => {
  if (weekDays.length === 0) return null;

  return (
    <div className="flex w-full justify-between mt-6 mb-6">
      {weekDays.map((day, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">{day.label}</span>
          <span
            className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-medium transition-all ${
              day.active
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted hover:bg-muted/70'
            }`}
          >
            {day.date}
          </span>
        </div>
      ))}
    </div>
  );
};
