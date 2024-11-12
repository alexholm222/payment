import s from './Trust.module.scss';
import { useRef, useState, useEffect } from 'react';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { ReactComponent as SuccesModal } from '../../image/succesModal.svg';
import { ReactComponent as ErrorModal } from '../../image/errorModal.svg';

function TrustSuccess({ day, setTrust, setAnim, anim, err }) {

    const modalRef = useRef()

    function handleClose() {
        setAnim(false)

        setTimeout(() => {
            setTrust(false);
        }, 400)
    }

    function closeModalOver(e) {

        if (modalRef.current && !modalRef.current.contains(e.target)) {
            e.stopPropagation()
            handleClose();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModalOver);

        return () => document.removeEventListener('mousedown', closeModalOver);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    return (
        <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim} ${s.modal_small}`}>
            <div className={s.close}><IconClose onClick={handleClose} /></div>
            {err ? <ErrorModal /> 
                      :
                    <SuccesModal onClick={handleClose} />
            }
            <div style={{ marginTop: '8px' }} className={s.header}>
                <p>{err ? 'Ошибка' : 'Услуга подключена'}</p>
            </div>

            {!err && <p className={s.sub}>Внесите платеж через {day} {day == 3 ? 'дня' : 'дней'}</p>}
            {err && <p className={s.sub}>Ошибка при подключении</p>}

        </div>
    )

};

export default TrustSuccess;