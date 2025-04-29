import s from './PayWidget.module.scss';
import { ReactComponent as WaletIcon } from '../../image/iconWallet.svg';
import { ReactComponent as ToltipIcon } from '../../image/toltipIcon.svg';
import { ReactComponent as IconAlert } from '../../image/iconAlert.svg';
import { useState, useEffect } from 'react';
import { getPaymentList } from '../../Api/Api';
import ModalAccount from '../ModalAccount/ModalAccount';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { handleMonth } from '../../utils/dates';
import { handleDifDate } from '../../utils/dates';
import Trust from '../Trust/Trust';
import { handleDay } from '../../utils/dates';

function PayWidget({ date, periodPay, ban, accountNum, accountBalance,
    sumToPay, payList, name, contract, paidTo, dataUpdate,
    offPro, onPro, dayForPay, setDataUpdate, trustDate }) {
    const [toltip, setTooltip] = useState(false);
    const [modal, setModal] = useState(false);
    const [deposite, setDeposite] = useState(0);
    const [nextTotalSum, setNextTotalSum] = useState(0);
    const [nextPayList, setNextPayList] = useState([]);
    const [trust, setTrust] = useState(false);

    useEffect(() => {
        if (accountBalance < 0) {
            setDeposite(accountBalance);
            return
        }

        if (accountBalance >= 0 && sumToPay > 0) {
            setDeposite((sumToPay - accountBalance) > 0 ? (sumToPay - accountBalance) : 0);
            return
        }

        if (sumToPay <= 0) {
            setDeposite(nextTotalSum);
            return
        }
    }, [accountBalance, sumToPay, nextTotalSum])

    useEffect(() => {
        getPaymentList(handleMonth(1).date)
            .then((res) => {
                const data = res.data.data;
                const filterList = data?.pays?.items?.filter(el => el.is_enabled === 1 && el.paid == 0);
                const paydSum = data?.pays?.items?.find(el => el.paid == 1) ? data?.pays?.items?.find(el => el.paid == 1) : 0;
                setNextTotalSum(data.pays.total_sum - paydSum);
                setNextPayList(filterList);
            })
    }, [dataUpdate, onPro, offPro]);


    function handleOpenTooltip() {
        setTooltip(true)
    }

    function handleCloseTooltip() {
        setTooltip(false)
    }

    function handleOpenModal() {
        setModal(true)
    }

    function handleTrust() {
        setTrust(true);
    }

    return (
        <div className={s.widget}>
            <div className={s.header}>
                <WaletIcon />
                <p className={s.account}>Лицевой счет №{accountNum}</p>
            </div>
            <p className={`${s.sub}`}>Текущий баланс</p>
            <p className={`${s.balance} ${accountBalance < 0 && s.balance_red}`}>{addSpaceNumber(accountBalance)} ₽</p>

            {sumToPay > 0 && periodPay && !ban && <div className={s.noticefail}>
                <div className={s.container}>
                    <IconAlert />
                    <p className={s.text_small}>
                        {sumToPay - accountBalance <= 0 && `Будет списанно ${addSpaceNumber(sumToPay)} ₽`}
                        {sumToPay - accountBalance > 0 && `Пополните счет на ${addSpaceNumber(sumToPay - accountBalance)} ₽`}
                    </p>
                </div>
                <div className={s.container_bottom}>
                    <p className={s.text_bottom}>к оплате до {trustDate !== '0000-00-00' ? handleDay(trustDate) : dayForPay} {date?.monthNameNow} {addSpaceNumber(sumToPay)} ₽</p>
                    <div className={s.icon_tooltip} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                        <ToltipIcon />
                        <div className={`${s.tooltip} ${toltip && s.tooltip_open}`}>
                            <div className={s.arrow}></div>
                            {payList?.map((el) => {
                                return <div className={s.item}>
                                    <p>{(el.type === 'royalty' && el.is_pro === 1 && el.pro_sum === 0) ? `Начальная подписка + PRO за 0 руб` : el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                                </div>
                            })}
                        </div>
                    </div>


                </div>
            </div>}

            {sumToPay > 0 && !periodPay && !ban && <div className={s.noticefail}>
                <div className={s.container}>
                    <IconAlert />
                    <p className={s.text_small}>Погасите задолженность {addSpaceNumber(sumToPay - accountBalance)} ₽</p>
                </div>
                <div className={s.container_bottom}>
                    <p className={s.text_bottom}>за дополнительные услуги</p>
                    <div className={s.icon_tooltip} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                        <ToltipIcon />
                        <div className={`${s.tooltip} ${toltip && s.tooltip_open}`}>
                            <div className={s.arrow}></div>
                            {payList?.map((el) => {
                                return <div className={s.item}>
                                    <p>{(el.type === 'royalty' && el.is_pro === 1 && el.pro_sum === 0) ? 'Начальная подписка + PRO за 0 руб' : el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>}

            {ban && <div className={s.noticefail}>
                <div className={s.container}>
                    <IconAlert />
                    <p className={s.text_small}>Погасите задолженность {addSpaceNumber(sumToPay - accountBalance)} ₽</p>
                </div>
                <div className={s.container_bottom}>
                    <p className={s.text_bottom}>Оказание услуг приостановлено</p>
                    <div className={s.icon_tooltip} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                        <ToltipIcon />
                        <div className={`${s.tooltip} ${toltip && s.tooltip_open}`}>
                            <div className={s.arrow}></div>
                            {payList?.map((el) => {
                                return <div className={s.item}>
                                    <p>{(el.type === 'royalty' && el.is_pro === 1 && el.pro_sum === 0) ? 'Начальная подписка + PRO за 0 руб' : el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>}

            {sumToPay <= 0 && !ban && <div className={s.notice}>
                <p>к оплате до {dayForPay} {handleDifDate(paidTo)} {addSpaceNumber(nextTotalSum)} ₽</p>
                <div className={s.icon_tooltip} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                    <ToltipIcon />
                    <div className={`${s.tooltip} ${toltip && s.tooltip_open}`}>
                        <div className={`${s.arrow} ${s.arrow_ok}`}></div>
                        {nextPayList?.map((el) => {
                            return <div className={s.item}>
                                <p>{(el.type === 'royalty' && el.is_pro === 1 && el.pro_sum === 0) ? 'Начальная подписка + PRO за 0 руб' : el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                            </div>
                        })}
                    </div>
                </div>

            </div>}

            <div className={s.buttons}>
                <button onClick={handleOpenModal} className={s.button}>Пополнить</button>
                {(ban || (sumToPay > 0 && date.day >= 1 && date.day <= 5)) && trustDate == '0000-00-00' && <button onClick={handleTrust} className={s.button_trusting}>Доверительный платеж</button>}
            </div>

            {modal && <ModalAccount setModal={setModal} deposite={Math.abs(deposite)} name={name} contract={contract} accountNum={accountNum} />}
            {trust && <Trust setTrust={setTrust} setDataUpdate={setDataUpdate} dataUpdate={dataUpdate} />}
        </div>
    )
};

export default PayWidget;