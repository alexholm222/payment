import s from './PayPro.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { enablePro } from '../../Api/Api';
import ProError from '../ProError/ProError';

function PayPro({ setPayWindow, proSum, date, id, setOnPro }) {
    const [depositModal, setDepositModal] = useState(false);
    const [depositSum, setDepositSum] = useState(0);
    const modalRef = useRef();

    function handleCloseModal() {
        setPayWindow(false)
    }

    function handleOnPro() {
        enablePro(date.date, id)
            .then((res) => {
                const status = res.data.data.status;
                console.log(res)
                if (status === 'changed') {
                    setOnPro(true);
                    return
                }

                if (status === 'deposit') {
                    const sum = Math.abs(res.data.data.sum);
                    setDepositModal(true);
                    setDepositSum(sum);
                    return
                }
            })
            .catch(err => console.log(err))
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
            {depositModal && <ProError depositSum={depositSum} setPayWindow={setPayWindow}/>}
            {!depositModal &&
                <div className={s.pay}>
                    <div ref={modalRef} className={s.container}>
                        <div className={s.header}>
                            <p className={s.title}>Изменение подписки</p>
                            <div onClick={handleCloseModal} className={s.close}>
                                <IconClose />
                            </div>
                        </div>
                        <div className={s.descript}>После подтверждения с вашего лицевого счета будет списана доплата за PRO-подписку </div>
                        <div className={s.block}>
                            <div className={s.num}>
                                <p>К оплате</p>
                                <span>{addSpaceNumber(proSum)} ₽</span>
                            </div>
                            <button onClick={handleOnPro} className={s.button}>Оплатить</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default PayPro