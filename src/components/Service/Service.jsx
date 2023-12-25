import { useState } from 'react';
import s from './Service.module.scss';
import { addSpaceNumber } from '../../utils/addSpaceNumber';

function Service({title, sum, activated, disabled}) {
    const [switchOn, setSwithOn] = useState(false);

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
            <div onClick={handleSwitch} className={`${s.switch} ${disabled && s.switch_disabled} ${switchOn && !disabled && s.switch_active} ${activated && disabled && s.switch_active}`}>
                <div></div>
            </div>
        </div>
    )
};

export default Service;