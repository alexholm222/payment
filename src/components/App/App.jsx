import s from './App.module.scss';
import PayWidget from '../PayWidget/PayWidget';
import Subscription from '../Subscription/Subscription';
import CalendarMonth from '../CalendarMonth/CalendarMonth';
import Services from '../Services/Services';
import { ReactComponent as ToltipIcon } from '../../image/toltipIcon.svg';
import History from '../History/History';
import { useEffect, useState } from 'react';
import PaySucces from '../Pay/PaySucces';
import PayWaiting from '../Pay/PayWaiting';
import { getPaymentList } from '../../Api/Api';
import { handleSubscriptionDate } from '../../utils/dates';

function App() {
  const [tooltip, setTooltip] = useState(false);
  const [date, setDate] = useState({});
  const [month, setMonth] = useState(0);
  const [pays, setPays] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [subscriptionDate, setSubscriptioonDate] = useState({});
  const [paid, setPaid] = useState(false);
  const [onPro, setOnPro] = useState(false);
  const [offPro, setOffPro] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(0)
   console.log(onPro)

  console.log(month)

  useEffect(() => {
    setDisabled(true)
    date.date && getPaymentList(date?.date)
      .then((res) => {
        const data = res.data.data;

        const subDate = handleSubscriptionDate(data.paid_to)
        setPays(data.pays.items);
        setTotalSum(data.pays.total_sum);
        console.log(data);
        setSubscriptioonDate(subDate)
        setDisabled(false);
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
      {/* <PaySucces/> */}
      {/* <PayWaiting/> */}
      <div className={s.container}>
        <p className={s.title}>Оплата услуг Skilla</p>
        <div className={s.main}>
          <div className={s.content}>
            <div className={s.header}>
              <div className={s.texts}>
                <p className={s.title_small}>Текущая подписка</p>
                {!paid && <p className={s.notice}>внесите оплату до 5 {date?.monthNameNow}</p>}
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
                  <p>Изменение доп. услуг в текущем месяце возможно до 5 {date?.month2}</p>
                  <div></div>
                </div>
              </div>
            }

            {month >= 0 && <Services month={month} pays={pays} date={date} setOnPro={setOnPro} 
                                     onPro={onPro} setOffPro={setOffPro} offPro={offPro} 
                                     setDataUpdate={setDataUpdate} dataUpdate={dataUpdate}/>}
            {/* <History /> */}
          </div>
          <PayWidget date={date}/>
        </div>
      </div>
    </div>
  );
}

export default App;
