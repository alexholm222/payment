import s from './ProSucces.module.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as SuccesModal } from '../../image/succesModal.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';

function ProSucces() {
    const [anim, setAnim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    },[])

   /*  function closeModalOver(e) {
        if (modalRef.current &&  !modalRef.current.contains(e.target)) {
            e.stopPropagation()
            setAnim(false);
            handleCloseModal();
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModalOver);

        return () => document.removeEventListener('mouseup', closeModalOver);
    }, []); */


    return (
        <div className={`${s.succes} ${anim && s.succes_anim}`}>
            <SuccesModal/>
            <p className={s.title}>Подписка изменена</p>
            <p className={s.text}>Преимущества PRO уже доступны</p>
            <div className={s.close}><IconClose/></div>
        </div>
    )
};

export default ProSucces;