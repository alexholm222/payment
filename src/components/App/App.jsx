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
import Partner from '../Partner/Partner';
import Acts from '../Acts/Acts';
import { getStatistic } from '../../Api/Api';

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
  const [inn, setInn] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sumToPay, setSumToPay] = useState(0);
  const [payList, setPayList] = useState([]);
  const [name, setName] = useState('');
  const [contract, setContract] = useState('');
  const [paidTo, setPaidTo] = useState('');
  const [dayForPay, setDayForPay] = useState(5);
  const [history, setHistory] = useState([]);
  const [trustDate, setTrustDate] = useState('');
  const [blockSwitch, setBlockSwitch] = useState(false);
  const [acts, setActs] = useState([]);
  const currentUrl = window.location.href;

  useEffect(() => {
    getStatistic()
    .then(res => console.log(res.data.data))
  }, [])

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
        setPays(data.pays.items);
        setTotalSum(data.pays.total_sum);
        setSubscriptioonDate(subDate)
        setDisabled(false);
        data.is_blocked === 1 ? setBan(true) : setBan(false);
        setDayForPay(dayPay);
        setHistory(data.pays.history);
        setTrustDate(data.payment_delay);
        setActs(data.acts);
        if (month === 0) {
          setAccountBalance(data.account.balance)
          setAccountNum(data.account.number);
          setInn(data.account.inn)
          setPhone(data.account.phone)
          setEmail(data.account.email)
          setName(data.account.name);
          setSumToPay(data.to_pay.total_sum);
          setPayList(data.to_pay.items);
          setContract(data.contract);
          setPaidTo(data.paid_to);

        }
      })
      .catch(err => console.log(err))
      .finally(() => setBlockSwitch(false))

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


  }, [date.monthNum, subscriptionDate])


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
                <p className={s.title_small}>Текущая подписка</p>
                {!paid && !ban && <p className={s.notice}>внесите оплату до {trustDate !== '0000-00-00' ? handleDay(trustDate) : dayForPay} {date?.monthNameNow}</p>}
                {paid && !ban && <p className={`${s.notice} ${s.notice_paid}`}>оплачена по {subscriptionDate?.day} {subscriptionDate?.monthName} {subscriptionDate?.year}</p>}
                {ban && <p className={s.notice}>погасите задолженность для доступа к системе</p>}
              </div>
              <CalendarMonth setDate={setDate} date={date} month={month} setMonth={setMonth} disabled={disabled} />
            </div>
            <Subscription pays={pays} totalSum={totalSum} month={month} date={date} />
            {month >= 0 &&
              <div className={s.service}>
                <p>Подключенные услуги</p>
                <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                  <ToltipIcon />
                </div>
                <div className={`${s.tooltip} ${tooltip && s.tooltip_open}`}>
                  <p>Отключение дополнительных услуг возможно до 5 числа календарного месяца</p>
                  <div></div>
                </div>
              </div>
            }

            {month >= -1 && <Services month={month} pays={pays} date={date} setOnPro={setOnPro}
              onPro={onPro} setOffPro={setOffPro} offPro={offPro}
              setDataUpdate={setDataUpdate} dataUpdate={dataUpdate}
              accountBalance={accountBalance} periodPay={periodPay} ban={ban} sumToPay={sumToPay} 
              setBlockSwitch={setBlockSwitch} blockSwitch={blockSwitch} accountNum={accountNum}/>}
            {history.length > 0 && <History history={history} />}
          </div>

          <div className={s.right}>
            <PayWidget date={date} periodPay={periodPay} ban={ban} accountNum={accountNum}
              accountBalance={accountBalance} sumToPay={sumToPay} payList={payList}
              name={name} contract={contract} paidTo={paidTo} dataUpdate={dataUpdate}
              onPro={onPro} offPro={offPro} dayForPay={dayForPay} setDataUpdate={setDataUpdate}
              trustDate={trustDate}
            />

            <Partner contract={contract} name={name} accountNum={accountNum} inn={inn} phone={phone} email={email} />
            <Acts actsList={acts}/>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
