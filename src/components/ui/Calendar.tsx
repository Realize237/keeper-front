import Calendar from 'react-calendar';
import '../../styles/SelectCalendarStyle.css'
import type { Value } from '../../interfaces/calendar';

interface SelectCalendarDateProps{
  currentDate: Value
  onChange: React.Dispatch<any>
  closeBottomSheet: ()=> void
}

export default function SelectCalendarDate({currentDate, onChange, closeBottomSheet}:SelectCalendarDateProps) {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <Calendar onChange={(value)=>{
          onChange(value)
          closeBottomSheet()
        }} value={currentDate} />
    </div>
  )
}
