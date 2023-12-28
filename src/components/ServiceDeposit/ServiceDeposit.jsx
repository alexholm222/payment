import s from './ServiceDeposit.module.scss';
import Deposit from '../Deposit/Deposit';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useState, useRef, useEffect } from 'react';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { enableBuh, enableSeo, enableSeoEx } from '../../Api/Api';
import { ReactComponent as SuccesModal } from '../../image/succesModal.svg';

function ServiceDeposit({ type, sum, setModalDeposit, title, accountBalance,
                          date, partnership, dataUpdate, setDataUpdate }) {
    const [depositModal, setDepositModal] = useState(false);
    const [total, setTotal] = useState(0);
    const [onSuccess, setOnSuccess] = useState(false)
    const modalRef = useRef();
    console.log(date)
    useEffect(() => {
        if (accountBalance >= 0) {
            setTotal(sum);
        } else {
            setTotal(Math.abs(accountBalance) + sum);
        }
    }, [sum, accountBalance])

    function handlePay() {
        setDepositModal(true)
    }

    function handleCloseModal() {
        setModalDeposit(false)
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
                    console.log(res)
                    const data = res.data.data;

                    if (data.status === 'changed') {
                        setDataUpdate(dataUpdate - 1);
                        setOnSuccess(true);
                        return
                    }

                    if (data.status === 'deposit') {
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
                        setDepositModal(true);
                        return
                    }
                })
                .catch(err => console.log(err))
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModalOver);

        return () => document.removeEventListener('mouseup', closeModalOver);
    }, []);

    return (
        <>
            {depositModal && !onSuccess && <Deposit depositSum={total} type={type} setModalDeposit={setModalDeposit} />}

            {!depositModal && !onSuccess &&
                <div className={s.pay}>
                    <div ref={modalRef} className={s.container}>
                        <div className={s.header}>
                            <p className={s.title}>Подключение услуги</p>
                            <div onClick={handleCloseModal} className={s.close}>
                                <IconClose />
                            </div>
                        </div>
                        <div className={s.descript}>После подтверждения с вашего лицевого счета будет списана доплата за {title.toLowerCase()}</div>
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
                                        <p className={s.title_sum}>{addSpaceNumber(total)} ₽</p>
                                    </div>

                                    <div style={{ marginBottom: '6px' }} className={s.block_text}>
                                        <p className={s.text}>{title}</p>
                                        <p className={s.text}>{addSpaceNumber(sum)} ₽</p>
                                    </div>

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
                <div className={s.pay}>
                    <div ref={modalRef} className={`${s.container} ${s.container_success}`}>
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