import s from './ServiceDeposit.module.scss';
import Deposit from '../Deposit/Deposit';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useState, useRef, useEffect } from 'react';
import { addSpaceNumber } from '../../utils/addSpaceNumber';

function ServiceDeposit({ type, sum, depositSum, setModalDeposit, title}) {
    const [depositModal, setDepositModal] = useState(false);
    const modalRef = useRef();

    function handlePay() {
        setDepositModal(true)
    }

    function handleCloseModal() {
        setModalDeposit(false)
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

    return (
        <>
            {depositModal && <Deposit depositSum={depositSum} type={type} setModalDeposit={setModalDeposit}/>}
            {!depositModal &&
                <div className={s.pay}>
                    <div ref={modalRef} className={s.container}>
                        <div className={s.header}>
                            <p className={s.title}>Изменение подписки</p>
                            <div onClick={handleCloseModal} className={s.close}>
                                <IconClose />
                            </div>
                        </div>
                        <div className={s.descript}>После подтверждения с вашего лицевого счета будет списана доплата за {title.toLowerCase()}</div>
                        <div className={s.block}>
                            <div className={s.num}>
                                <p>К оплате</p>
                                <span>{addSpaceNumber(sum)} ₽</span>
                            </div>
                            <button onClick={handlePay} className={s.button}>Оплатить</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default ServiceDeposit;