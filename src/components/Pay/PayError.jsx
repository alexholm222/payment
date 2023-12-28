import s from './Pay.module.scss';
import { ReactComponent as ErrorModal } from '../../image/errorModal.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useState, useEffect, useRef } from 'react';

function PayError({ setPay }) {
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();
    

    function handleCloseModal() {
        setPay(false);
        window.open('https://lk.skilla.ru/director/pay/', '_self');
    }

    function closeModalOver(e) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            e.stopPropagation()
            handleCloseModal();
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModalOver);

        return () => document.removeEventListener('mouseup', closeModalOver);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    return (
        <div className={`${s.modalwindow} ${anim && s.modalwindow_anim}`}>
            <div ref={modalRef} className={`${s.succes}`}>
                <ErrorModal />
                <p className={s.title}>Оплата не прошла</p>
                <p className={s.text}>Средства не поступили на лицевой счет</p>
                <div onClick={handleCloseModal} className={s.close}><IconClose /></div>
            </div>
        </div>
    )
};

export default PayError;
