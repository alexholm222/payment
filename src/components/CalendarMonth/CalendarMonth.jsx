import s from './CalendarMonth.module.scss';
import { ReactComponent as IconCalendar } from '../../image/iconCalendar.svg';
import { ReactComponent as ArrowLeft } from '../../image/arrowLeft.svg';
import { useEffect, useState } from 'react';
import { handleMonth } from '../../utils/dates';

function CalendarMonth({setDate, date}) {
    const [month, setMonth] = useState(0);
    

   useEffect(() => {
    setDate(handleMonth(month));
   },[month])
   
    console.log(date, month)
   

    function handleChangeMonth(e) {
        const id = e.currentTarget.id;
        if (id === 'left') {
            setMonth(month - 1)
        } else {
            setMonth(month + 1)
        }

    }



    return (
        <div className={`${s.month} `}>
            <div onClick={handleChangeMonth} id='left' className={`${s.left}`}>
                <ArrowLeft />
            </div>
            <div className={`${s.center}`}>
                <IconCalendar />
                <p>{date.month}</p>
            </div>

            <div onClick={handleChangeMonth} id='right' className={`${s.right} ${month >= 0 && s.right_dis}`}>
                <ArrowLeft />
            </div>
        </div>
    )
};

export default CalendarMonth;