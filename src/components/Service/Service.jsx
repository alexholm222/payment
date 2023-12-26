import { useEffect, useState } from 'react';
import s from './Service.module.scss';
import { addSpaceNumber } from '../../utils/addSpaceNumber';

function Service({title, sum, activated, disabled, date, paid, type}) {
    const [switchOn, setSwithOn] = useState(false);

    useEffect(() => {
        activated ? setSwithOn(true) : setSwithOn(false)
    },[date])
 
    useEffect(() => {
        if(activated) {
            setSwithOn(true)
        } else {
            setSwithOn(false)
        }
    },[activated])

    function handleSwitch() {
        if(switchOn) {
            !disabled && setSwithOn(false)
        } else {
            !disabled && setSwithOn(true)
        }
    }
    return (
        <div className={s.service}>
            <p className={s.text}>{title}<span>{addSpaceNumber(sum)} ₽</span></p>
            {paid && <div className={s.paid}><p>Оплаченно</p></div>}
            <div onClick={handleSwitch} className={`${s.switch} ${disabled && s.switch_disabled} ${switchOn && !disabled && s.switch_active} ${activated && disabled && s.switch_active}`}>
                <div></div>
            </div>
        </div>
    )
};

export default Service;