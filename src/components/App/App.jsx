import s from './App.module.scss';
import PayWidget from '../PayWidget/PayWidget';
import Subscription from '../Subscription/Subscription';
import CalendarMonth from '../CalendarMonth/CalendarMonth';
import Services from '../Services/Services';
import { ReactComponent as ToltipIcon } from '../../image/toltipIcon.svg';
import History from '../History/History';
import { useEffect, useState } from 'react';
import PaySucces from '../Pay/PaySucces';
import PayError from '../Pay/PayError';
import PayWaiting from '../Pay/PayWaiting';
import { getPaymentList } from '../../Api/Api';
import { handleSubscriptionDate, handlePayPeriod } from '../../utils/dates';
import { handleDay } from '../../utils/dates';

function App() {
  const [tooltip, setTooltip] = useState(false);
  const [date, setDate] = useState({});
  const [month, setMonth] = useState(0);
  const [pays, setPays] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [subscriptionDate, setSubscriptioonDate] = useState({});
  const [paid, setPaid] = useState(false);
  const [onPro, setOnPro] = useState(false);
  const [offPro, setOffPro] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(0);
  const [periodPay, setPeriodPay] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [payError, setPayError] = useState(false);
  const [ban, setBan] = useState(false);
  const [accountNum, setAccountNum] = useState('');
  const [sumToPay, setSumToPay] = useState(0);
  const [payList, setPayList] = useState([]);
  const [name, setName] = useState('');
  const [contract, setContract] = useState('');
  const [paidTo, setPaidTo] = useState('');
  const [dayForPay, setDayForPay] = useState(5);
  console.log(dayForPay)
  const currentUrl = window.location.href;

  useEffect(() => {
    if (currentUrl.includes('pay/?result=success')) {
      setPaySuccess(true);
      return
    }

    if (currentUrl.includes('pay/?result=fail')) {
      setPayError(true);
      return
    }
  }, [])

  useEffect(() => {
    setPeriodPay(handlePayPeriod(dayForPay));
  }, [dayForPay])

  useEffect(() => {
    setDisabled(true)
    date.date && getPaymentList(date?.date)
      .then((res) => {
        const data = res.data.data;
        const dayPay = handleDay(data.paid_to);
        const subDate = handleSubscriptionDate(data.paid_to, dayPay)
        console.log(dayPay, subDate)
        setPays(data.pays.items);
        setTotalSum(data.pays.total_sum);
        setAccountBalance(data.account_balance)
        console.log(data);
        setSubscriptioonDate(subDate)
        setDisabled(false);
        data.is_blocked === 1 ? setBan(true) : setBan(false);
        setDayForPay(dayPay)
        if (month === 0) {
          setAccountNum(data.account_number);
          setSumToPay(data.to_pay.total_sum);
          setPayList(data.to_pay.items);
          setName(data.name);
          setContract(data.contract);
          setPaidTo(data.paid_to);
        }
      })
      .catch(err => console.log(err))
  }, [date, onPro, offPro, dataUpdate]);

  useEffect(() => {
    const year = date.yearNow;
    const yearSub = subscriptionDate.year;
    const monthNum = date.monthNum;
    const monthSub = subscriptionDate.month;

    if (yearSub > year) {
      setPaid(true);
      return
    }

    if (yearSub < year) {
      setPaid(false);
      return
    }

    if (yearSub === year && monthNum <= monthSub) {
      setPaid(true);
      return
    }

    if (yearSub === year && monthNum > monthSub) {
      setPaid(false);
      return
    }


  }, [date.monthNum, subscriptionDate.month])

  function handleOpenTooltip() {
    setTooltip(true)
  }

  function handleCloseTooltip() {
    setTooltip(false)
  }

  return (
    <div className={s.app}>
      {paySuccess && <PaySucces setPay={setPaySuccess} />}
      {payError && <PayError setPay={setPayError} />}
      <div className={s.container}>
        <p className={s.title}>Оплата услуг Skilla</p>
        <div className={s.main}>
          <div className={s.content}>
            <div className={s.header}>
              <div className={s.texts}>
                {month === 0 && <p className={s.title_small}>Текущая подписка</p>}
                {month !== 0 && <p className={s.title_small}>Будет начислено 1 {date.month2}</p>}
                {!paid && <p className={s.notice}>внесите оплату до {dayForPay} {date?.monthNameNow}</p>}
                {paid && <p className={`${s.notice} ${s.notice_paid}`}>оплачена по {subscriptionDate?.day} {subscriptionDate?.monthName} {subscriptionDate?.year}</p>}
              </div>
              <CalendarMonth setDate={setDate} date={date} month={month} setMonth={setMonth} disabled={disabled} />
            </div>
            <Subscription pays={pays} totalSum={totalSum} />
            {month >= 0 &&
              <div className={s.service}>
                <p>Подключенные услуги</p>
                <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                  <ToltipIcon />
                </div>
                <div className={`${s.tooltip} ${tooltip && s.tooltip_open}`}>
                  <p>Отключение доп. услуг возможно до 5 {date?.month2}</p>
                  <div></div>
                </div>
              </div>
            }

            {month >= 0 && <Services month={month} pays={pays} date={date} setOnPro={setOnPro}
              onPro={onPro} setOffPro={setOffPro} offPro={offPro}
              setDataUpdate={setDataUpdate} dataUpdate={dataUpdate}
              accountBalance={accountBalance} periodPay={periodPay} ban={ban} />}
            {/* <History /> */}
          </div>
          <PayWidget date={date} periodPay={periodPay} ban={ban} accountNum={accountNum} 
                     accountBalance={accountBalance} sumToPay={sumToPay} payList={payList} 
                     name={name} contract={contract} paidTo={paidTo} dataUpdate={dataUpdate}
                     onPro={onPro} offPro={offPro} dayForPay={dayForPay}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
