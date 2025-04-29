import s from './ServiceDeposit.module.scss';
import Deposit from '../Deposit/Deposit';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useState, useRef, useEffect } from 'react';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { enableBuh, enableSeo, enableSeoEx } from '../../Api/Api';
import { ReactComponent as SuccesModal } from '../../image/succesModal.svg';

function ServiceDeposit({ type, sum, setModalDeposit, title, accountBalance,
    date, partnership, dataUpdate, setDataUpdate, setBlockSwitch }) {
    const [depositModal, setDepositModal] = useState(false);
    const [total, setTotal] = useState(0);
    const [onSuccess, setOnSuccess] = useState(false);
    const [anim, setAnim] = useState(false);
    const [sumToPay, setSumToPay] = useState(0)
    const modalRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100)
    }, [])
    
    useEffect(() => {
        if (accountBalance === 0) {
            setTotal(sum);
            setSumToPay(sum);
            return
        }

        if (accountBalance < 0) {
            setTotal(Math.abs(accountBalance) + sum);
            setSumToPay(Math.abs(accountBalance) + sum);
            return
        }

    }, [sum, accountBalance])

    function handlePay() {
        setDepositModal(true)
    }

    function handleCloseModal() {
        setAnim(false)

        setTimeout(() => {
            setModalDeposit(false)
            setBlockSwitch(false)
        }, 400)

        setOnSuccess(false)
    }

    function closeModalOver(e) {

        if (modalRef.current && !modalRef.current.contains(e.target)) {
            e.stopPropagation()
            handleCloseModal();
        }
    }

    function handleOnService() {

        if (type === 'buh') {
            enableBuh(date.date, partnership.id)
                .then((res) => {
                    const data = res.data.data
                    if (data.status === 'changed') {
                        setDataUpdate(dataUpdate - 1);
                        setOnSuccess(true);
                        return
                    }

                    if (data.status === 'deposit') {
                        if (accountBalance > 0) {
                            setSumToPay(Math.abs(data.sum))
                        }
                        setDepositModal(true);
                        return
                    }
                })
                .catch(err => console.log(err))
            return
        }

        if (type === 'seo') {
            enableSeo(date.date, partnership.id)
                .then((res) => {
                    const data = res.data.data;

                    if (data.status === 'changed') {
                        setDataUpdate(dataUpdate - 1);
                        setOnSuccess(true);
                        return
                    }

                    if (data.status === 'deposit') {
                        if (accountBalance > 0) {
                            setSumToPay(Math.abs(data.sum))
                        }
                        setDepositModal(true);
                        return
                    }
                })
                .catch(err => console.log(err))
            return
        }

        if (type === 'seo_express') {
            enableSeoEx(date.date, partnership.id)
                .then((res) => {
                    const data = res.data.data;
                
                    if (data.status === 'changed') {
                        setDataUpdate(dataUpdate - 1);
                        setOnSuccess(true);
                        return
                    }

                    if (data.status === 'deposit') {
                        if (accountBalance > 0) {
                            setSumToPay(Math.abs(data.sum))
                        }
                        setDepositModal(true);
                        return
                    }
                })
                .catch(err => console.log(err))
            return
        }

        if(type === 'royalty') {
            setDepositModal(true);
            setSumToPay(Math.abs(accountBalance))
        }
    }
    
    useEffect(() => {
        document.addEventListener('mouseup', closeModalOver);

        return () => document.removeEventListener('mouseup', closeModalOver);
    }, []);

    return (
        <>
            {depositModal && !onSuccess && <Deposit depositSum={sumToPay} type={type} setModalDeposit={setModalDeposit} title={type === 'royalty' ? 'подписку PRO' : title} />}

            {!depositModal && !onSuccess &&
                <div className={`${s.pay}  ${anim && s.pay_anim}`}>
                    <div ref={modalRef} className={`${s.container} ${anim && s.container_anim}`}>
                        <div className={s.header}>
                            <p className={s.title}>{type !== 'royalty' ? `Подключение услуги` : 'Погасите долг'}</p>
                            <div onClick={handleCloseModal} className={s.close}>
                                <IconClose />
                            </div>
                        </div>
                        {type !== 'royalty' && <div className={s.descript}>После подтверждения с вашего лицевого счета будет списана доплата за {title.toLowerCase()}</div>}
                        {type === 'royalty' && <div className={s.descript}>Погасите долг что бы включить подписку PRO</div>}
                        <div className={s.block}>

                            {accountBalance >= 0 &&
                                <div className={s.num}>
                                    <p>К оплате</p>
                                    <span>{addSpaceNumber(sum)} ₽</span>
                                </div>
                            }

                            {accountBalance < 0 &&
                                <div className={s.block_sum}>
                                    <div style={{ marginBottom: '12px' }} className={s.block_text}>
                                        <p className={s.title_sum}>К оплате</p>
                                        {type !== 'royalty' && <p className={s.title_sum}>{addSpaceNumber(total)} ₽</p>}
                                        {type === 'royalty' && <p className={s.title_sum}>{addSpaceNumber(Math.abs(accountBalance))} ₽</p>}
                                    </div>

                                    {type !== 'royalty' && <div style={{ marginBottom: '6px' }} className={s.block_text}>
                                        <p className={s.text}>{title}</p>
                                        <p className={s.text}>{addSpaceNumber(sum)} ₽</p>
                                    </div>
                                    }

                                    <div style={{ marginBottom: '12px' }} className={s.block_text}>
                                        <p className={s.text}>Долг</p>
                                        <span>{addSpaceNumber(Math.abs(accountBalance))} ₽</span>
                                    </div>

                                </div>
                            }
                            <button onClick={handleOnService} className={s.button}>Оплатить</button>
                        </div>
                    </div>
                </div>
            }

            {onSuccess &&
                <div className={`${s.pay}  ${anim && s.pay_anim}`}>
                    <div ref={modalRef} className={`${s.container} ${s.container_success} ${anim && s.container_anim}`}>
                        <SuccesModal />
                        <p style={{ margin: '16px 0 8px' }} className={s.title}>Услуга подключена</p>
                        <div style={{ marginBottom: '0' }} className={s.descript}>{title} оплачено по {date.lastDay} {date.monthNameNow} {date.yearNow}</div>
                        <div onClick={handleCloseModal} className={`${s.close} ${s.close_success}`}>
                            <IconClose />
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default ServiceDeposit;