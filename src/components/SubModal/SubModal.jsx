import s from './SubModal.module.scss';
import { ReactComponent as SuccesModal } from '../../image/succesModal.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useEffect, useRef, useState } from 'react';

function SubModal({type, setOnPro, setOffPro}) {
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }) 
    },[])

    function handleCloseModal() {
        type === 'on' ? setOnPro(false) : setOffPro(false);
    }

    function closeModalOver(e) {

        if (modalRef.current && !modalRef.current.contains(e.target)) {
            e.stopPropagation()
            setAnim(false);
            handleCloseModal();
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModalOver);

        return () => document.removeEventListener('mouseup', closeModalOver);
    }, []);


    return (
        <div className={`${s.submodal} ${anim && s.submodal_anim}`}>
            <div ref={modalRef} className={s.container}>
                <SuccesModal/>
                <p className={s.title}>Подписка изменена</p>
                {type === 'on' && <p className={s.text}>Преимущества PRO уже доступны</p>}
                {type === 'off' && <p className={s.text}>Вы можете вернуться на PRO в любое время</p>}
                <div onClick={handleCloseModal} className={s.close}><IconClose/></div>
            </div>
         
        </div>
    )
};

export default SubModal;