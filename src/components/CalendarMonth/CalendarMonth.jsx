import s from './CalendarMonth.module.scss';
import { ReactComponent as IconCalendar } from '../../image/iconCalendar.svg';
import { ReactComponent as ArrowLeft } from '../../image/arrowLeft.svg';
import { useEffect, useState } from 'react';


function CalendarMonth() {
    const [month, setMonth] = useState(0);
   
   
    console.log(month)
   

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
                <p>{`май`}</p>
            </div>

            <div onClick={handleChangeMonth} id='right' className={`${s.right} ${month >= 0 && s.right_dis}`}>
                <ArrowLeft />
            </div>
        </div>
    )
};

export default CalendarMonth;