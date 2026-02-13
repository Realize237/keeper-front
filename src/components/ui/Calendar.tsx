import Calendar from 'react-calendar';
import '../../styles/SelectCalendarStyle.css';
import type { Value } from '../../interfaces/calendar';
import { useTranslation } from 'react-i18next';

interface SelectCalendarDateProps {
  currentDate: Value;
  onChange: React.Dispatch<Value>;
  closeBottomSheet: () => void;
}

export default function SelectCalendarDate({
  currentDate,
  onChange,
  closeBottomSheet,
}: SelectCalendarDateProps) {
  const { i18n } = useTranslation();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Calendar
        locale={i18n.language}
        onChange={(value) => {
          onChange(value);
          closeBottomSheet();
        }}
        className="bg-amber-400"
        value={currentDate}
      />
    </div>
  );
}
