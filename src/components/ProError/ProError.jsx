import s from './ProError.module.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as ErrorModal } from '../../image/errorModal.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { ReactComponent as IconCard } from '../../image/iconCard.svg';

function ProError() {
    const [anim, setAnim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    },[])

    return (
        <div className={`${s.error} ${anim && s.error_anim}`}>
        <ErrorModal/>
        <p className={s.title}>Недостаточно средств</p>
        <p className={s.text}>Пополните счет чтобы подключить PRO-подписку</p>
        <button className={s.button}><IconCard/> Оплатить картой</button>
        <div className={s.close}><IconClose/></div>
    </div>
    )
};

export default ProError;