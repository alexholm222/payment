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

function PayWidget({ date, periodPay, ban }) {
    const [toltip, setTooltip] = useState(false);
    const [modal, setModal] = useState(false);
    const [accountNum, setAccountNum] = useState('');
    const [accountBalance, setAccountBalance] = useState(0);
    const [sumToPay, setSumToPay] = useState(0);
    const [payList, setPayList] = useState([]);
    const [deposite, setDeposite] = useState(0);
    const [name, setName] = useState('');
    const [contract, setContract] = useState('');
    const [paidTo, setPaidTo] = useState('');
    const [nextTotalSum, setNextTotalSum] = useState(0);
    const [nextPayList, setNextPayList] = useState([]);

    useEffect(() => {
        if(accountBalance < 0) {
            setDeposite(accountBalance);
            return
        }

        if(accountBalance >= 0 && sumToPay > 0) {
            setDeposite((sumToPay - accountBalance) > 0 ? (sumToPay - accountBalance) : 0)
        }

        if(sumToPay <= 0 ) {
             setDeposite(nextTotalSum)
        }
    },[accountBalance, sumToPay])

    console.log(sumToPay)
    useEffect(() => {

        getPaymentList(handleMonth(0).date)
            .then((res) => {
                const data = res.data.data;
                setAccountNum(data.account_number);
                setAccountBalance(data.account_balance);
                setSumToPay(data.to_pay.total_sum);
                setPayList(data.to_pay.items);
                setName(data.name);
                setContract(data.contract);
                setPaidTo(data.paid_to);
                console.log(data);

            })
            .catch(err => console.log(err));

            getPaymentList(handleMonth(1).date)
            .then((res) => {
                const data = res.data.data;
                setNextTotalSum(data.pays.total_sum);
                setNextPayList(data.pays.items);
                console.log(data);
            })
    }, []);


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
                    <p>Пополните счет</p>
                </div>
                <div className={s.container_bottom}>
                    <p className={s.text_bottom}>к оплате до 5 {date?.monthNameNow} {addSpaceNumber(sumToPay)} ₽</p>
                    <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                        <ToltipIcon />
                    </div>

                    <div style={{left: '160px'}} className={`${s.tooltip} ${s.tooltip_fail} ${toltip && s.tooltip_open}`}>
                    <div className={s.arrow}></div>
                    {payList?.map((el) => {
                        return  <div className={s.item}>
                        <p>{el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                    </div>
                    })}
                </div>
                </div>
            </div>}

            {sumToPay > 0 && !periodPay && !ban && <div className={s.noticefail}>
                <div className={s.container}>
                    <IconAlert />
                    <p>Погасите задолженность</p>
                </div>
                <div className={s.container_bottom}>
                    <p className={s.text_bottom}>за дополнительные услуги</p>
                    <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                        <ToltipIcon />
                    </div>

                    <div style={{left: '130px'}} className={`${s.tooltip} ${s.tooltip_fail} ${toltip && s.tooltip_open}`}>
                    <div className={s.arrow}></div>
                    {payList?.map((el) => {
                        return  <div className={s.item}>
                        <p>{el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                    </div>
                    })}
                </div>
                </div>
            </div>}

            {ban && <div className={s.noticefail}>
                <div className={s.container}>
                    <IconAlert />
                    <p>Погасите задолженность</p>
                </div>
                <div className={s.container_bottom}>
                    <p className={s.text_bottom}>Оказание услуг приостановлено</p>
                    <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                        <ToltipIcon />
                    </div>

                    <div style={{left: '176px'}} className={`${s.tooltip} ${s.tooltip_fail} ${toltip && s.tooltip_open}`}>
                    <div className={s.arrow}></div>
                    {payList?.map((el) => {
                        return  <div className={s.item}>
                        <p>{el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                    </div>
                    })}
                </div>
                </div>
            </div>}


            {sumToPay <= 0 && !ban && <div className={s.notice}>
                <p>к оплате до 5 {handleDifDate(paidTo)} {addSpaceNumber(nextTotalSum)} ₽</p>
                <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                    <ToltipIcon />
                </div>
                <div className={`${s.tooltip} ${s.tooltip_ok} ${toltip && s.tooltip_open}`}>
                    {/* <div className={s.arrow}></div> */}
                    {nextPayList?.map((el) => {
                        return  <div className={s.item}>
                        <p>{el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                    </div>
                    })}
                </div>
            </div>}
            <button onClick={handleOpenModal} className={s.button}>Пополнить</button>
            {modal && <ModalAccount setModal={setModal} deposite={Math.abs(deposite)} name={name} contract={contract} accountNum={accountNum}/>}
        </div>
    )
};

export default PayWidget;