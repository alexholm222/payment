import s from './PayPro.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { enablePro } from '../../Api/Api';
import ProError from '../ProError/ProError';

function PayPro({ setPayWindow, proSum, date, id, setOnPro, accountBalance }) {
    const [depositModal, setDepositModal] = useState(false);
    const [depositSum, setDepositSum] = useState(0);
    const [anim, setAnim] = useState(false);
    
    const modalRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

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
            {depositModal && <ProError depositSum={accountBalance < 0 ? Math.abs(accountBalance) + proSum : depositSum} setPayWindow={setPayWindow} />}
            {!depositModal &&
                <div className={`${s.pay}`}>
                    <div ref={modalRef} className={`${s.container} ${anim && s.container_anim}`}>
                        <div className={s.header}>
                            <p className={s.title}>Изменение подписки</p>
                            <div onClick={handleCloseModal} className={s.close}>
                                <IconClose />
                            </div>
                        </div>
                        <div className={s.descript}>После подтверждения с вашего лицевого счета будет списана доплата за PRO-подписку </div>
                        <div className={s.block}>

                            {accountBalance >= 0 &&
                                <div className={s.num}>
                                    <p>К оплате</p>
                                    <span>{addSpaceNumber(proSum)} ₽</span>
                                </div>
                            }

                            {accountBalance < 0 &&
                             <div className={s.block_sum}>
                             <div style={{ marginBottom: '12px' }} className={s.block_text}>
                                 <p className={s.title_sum}>К оплате</p>
                                 <p className={s.title_sum}>{addSpaceNumber(Math.abs(accountBalance) + proSum)} ₽</p>
                               
                             </div>

                             <div style={{ marginBottom: '6px' }} className={s.block_text}>
                                 <p className={s.text}>PRO-подписка</p>
                                 <p className={s.text}>{addSpaceNumber(proSum)} ₽</p>
                             </div>
                             

                             <div style={{ marginBottom: '12px' }} className={s.block_text}>
                                 <p className={s.text}>Долг</p>
                                 <span>{addSpaceNumber(Math.abs(accountBalance))} ₽</span>
                             </div>

                         </div>
                            
                            }
                            <button onClick={handleOnPro} className={s.button}>Оплатить</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default PayPro