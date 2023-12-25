import s from './Pay.module.scss';
import { ReactComponent as SuccesModal } from '../../image/succesModal.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useState, useEffect } from 'react';

function PaySucces() {
    const [anim, setAnim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    return (
        <div className={`${s.modalwindow} ${anim && s.modalwindow_anim}`}>
            <div className={`${s.succes}`}>
                <SuccesModal />
                <p className={s.title}>Оплата прошла успешно</p>
                <p className={s.text}>Средства зачислены на лицевой счет</p>
                <div className={s.close}><IconClose /></div>
            </div>
        </div>
    )
};

export default PaySucces;
