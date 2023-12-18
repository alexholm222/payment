import s from './Subscription.module.scss';
import CalendarMonth from '../CalendarMonth/CalendarMonth';

function Subscription() {
    return (
        <div className={s.sub}>
            <p className={s.title}>Текущая подписка</p>
            <CalendarMonth />
        </div>
    )
};

export default Subscription;