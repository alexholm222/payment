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

function PayWidget({ date, periodPay, ban, accountNum, accountBalance, 
                     sumToPay, payList, name, contract, paidTo, dataUpdate,
                     offPro, onPro, dayForPay }) {
    const [toltip, setTooltip] = useState(false);
    const [modal, setModal] = useState(false);
    const [deposite, setDeposite] = useState(0);
    const [nextTotalSum, setNextTotalSum] = useState(0);
    const [nextPayList, setNextPayList] = useState([]);

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
                const filterList = data.pays.items.filter(el => el.is_enabled === 1)
                setNextTotalSum(data.pays.total_sum);
                setNextPayList(filterList);
                console.log(data);
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
    
    return (
        <div className={s.widget}>
            <div className={s.header}>
                <WaletIcon />
                <p className={s.account}>Лицевой счет № {accountNum}</p>
            </div>
            <p className={`${s.sub}`}>Текущий баланс</p>
            <p className={`${s.balance} ${accountBalance < 0 && s.balance_red}`}>{addSpaceNumber(accountBalance)} ₽</p>

            {sumToPay > 0 && periodPay && !ban && <div className={s.noticefail}>
                <div className={s.container}>
                    <IconAlert />
                    <p className={s.text_small}>Пополните счет</p>
                </div>
                <div className={s.container_bottom}>
                    <p className={s.text_bottom}>к оплате до {dayForPay} {date?.monthNameNow} {addSpaceNumber(sumToPay)} ₽</p>
                    <div style={{display: 'flex', alignItems: 'center'}} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                        <ToltipIcon />
                    </div>

                    <div style={{ left: '160px' }} className={`${s.tooltip} ${s.tooltip_fail} ${toltip && s.tooltip_open}`}>
                        <div className={s.arrow}></div>
                        {payList?.map((el) => {
                            return <div className={s.item}>
                                <p>{el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                            </div>
                        })}
                    </div>
                </div>
            </div>}

            {sumToPay > 0 && !periodPay && !ban && <div className={s.noticefail}>
                <div className={s.container}>
                    <IconAlert />
                    <p className={s.text_small}>Погасите задолженность</p>
                </div>
                <div className={s.container_bottom}>
                    <p className={s.text_bottom}>за дополнительные услуги</p>
                    <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                        <ToltipIcon />
                    </div>

                    <div style={{ left: '131px' }} className={`${s.tooltip} ${s.tooltip_fail} ${toltip && s.tooltip_open}`}>
                        <div className={s.arrow}></div>
                        {payList?.map((el) => {
                            return <div className={s.item}>
                                <p>{el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                            </div>
                        })}
                    </div>
                </div>
            </div>}

            {ban && <div className={s.noticefail}>
                <div className={s.container}>
                    <IconAlert />
                    <p className={s.text_small}>Погасите задолженность</p>
                </div>
                <div className={s.container_bottom}>
                    <p className={s.text_bottom}>Оказание услуг приостановлено</p>
                    <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                        <ToltipIcon />
                    </div>

                    <div style={{ left: '176px' }} className={`${s.tooltip} ${s.tooltip_fail} ${toltip && s.tooltip_open}`}>
                        <div className={s.arrow}></div>
                        {payList?.map((el) => {
                            return <div className={s.item}>
                                <p>{el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                            </div>
                        })}
                    </div>
                </div>
            </div>}

            {sumToPay <= 0 && !ban && <div className={s.notice}>
                <p>к оплате до {dayForPay} {handleDifDate(paidTo)} {addSpaceNumber(nextTotalSum)} ₽</p>
                <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                    <ToltipIcon />
                </div>
                <div className={`${s.tooltip} ${s.tooltip_ok} ${toltip && s.tooltip_open}`}>
                    <div className={`${s.arrow} ${s.arrow_ok}`}></div>
                    {nextPayList?.map((el) => {
                        return <div className={s.item}>
                            <p>{el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                        </div>
                    })}
                </div>
            </div>}
            <button onClick={handleOpenModal} className={s.button}>Пополнить</button>
            {modal && <ModalAccount setModal={setModal} deposite={Math.abs(deposite)} name={name} contract={contract} accountNum={accountNum} />}
        </div>
    )
};

export default PayWidget;