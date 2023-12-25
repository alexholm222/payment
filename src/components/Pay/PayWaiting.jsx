import s from './Pay.module.scss';
import { ReactComponent as SuccesModal } from '../../image/succesModal.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';

function PayWaiting() {
    const [anim, setAnim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    return (
        <div className={`${s.modalwindow} ${anim && s.modalwindow_anim}`}>
            <div className={`${s.succes} ${s.waiting}`}>
                <Loader />
                <p style={{marginBottom: '0'}} className={s.title}>Ожидаем ответ от банка</p>
                <div className={s.close}><IconClose /></div>
            </div>
        </div>
    )
};

export default PayWaiting;