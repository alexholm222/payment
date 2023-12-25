import s from './ModalAccount.module.scss';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { ReactComponent as IconCard } from '../../image/iconCard.svg';
import { useEffect, useRef, useState } from 'react';
import noPhoto from '../../image/noPhoto.svg';
import Requisites from '../Requisites/Requisites';
import { addSpaceNumber } from '../../utils/addSpaceNumber';

function ModalAccount({ setModal }) {
    const [anim, setAnim] = useState(false);
    const [requisites, setRequisites] = useState(false);
    const [sumValue, setSumValue] = useState('');
    
    const modalRef = useRef();
    const buttonRef = useRef();
    const reqRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    function closeModal() {
        setModal(false)
    }

    function handleOpenReq() {
        setRequisites(true)
    }

    function closeModalOver(e) {

        if (modalRef.current &&  !modalRef.current.contains(e.target) && !reqRef.current && !buttonRef.current.contains(e.target)) {
            e.stopPropagation()
            setAnim(false);
            closeModal();
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModalOver);

        return () => document.removeEventListener('mouseup', closeModalOver);
    }, []);

    function handleInput(e) {
        const value = e.target.value;
        setSumValue(value)
    }
    console.log(sumValue)

    return (
        <div className={`${s.modal} ${anim && s.modal_anim}`}>
            <div ref={modalRef} className={`${s.window} ${anim && s.window_anim}`}>
                <div className={s.header}>
                    <p>Пополнение лицевого счета</p>
                    <IconClose ref={buttonRef} onClick={closeModal} />
                </div>

                <div className={s.card}>
                    <div className={s.avatar}>
                        <img src={noPhoto}></img>

                    </div>
                    <div className={s.block_client}>
                        <p>Владимир Пупкин</p>
                        <span>ЛС №123456789</span>
                    </div>
                </div>

                <div className={s.amount}>
                    <p>Сумма зачисления на счет</p>
                    <div className={s.input}>
                        <input value={sumValue || ''} onChange={handleInput} type='text'></input>
                        <p>руб</p>
                    </div>
                    <p style={{ fontSize: '14px' }}>Комиссия будет указана в следующем окне</p>
                </div>

                <div className={s.button}>
                    <IconCard />
                    <p>Оплатить картой</p>
                </div>
                <div className={s.container_button}>
                    <button onClick={handleOpenReq} className={s.button_details}>Показать банковские реквизиты</button>
                </div>
            </div>

            {requisites && <div className={s.req} ref={reqRef}><Requisites setRequisites={setRequisites}/></div>}
        </div>
    )
};

export default ModalAccount;