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

function App() {
  const [tooltip, setTooltip] = useState(false);
  const [date, setDate] = useState({});

  useEffect(() => {
    getPaymentList(date)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  },[date])

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
                <p className={s.notice}>внесите оплату до 5 января</p>
              </div>
              <CalendarMonth setDate={setDate} date={date}/>
            </div>
            <Subscription/>
            <div className={s.service}>
              <p>Подключенные услуги</p>
              <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                  <ToltipIcon/>
              </div>
              <div className={`${s.tooltip} ${tooltip && s.tooltip_open}`}>
                <p>Изменение доп. услуг в текущем месяце возможно до 5 {`января`}</p>
                <div></div>
              </div>
            </div>
            <Services/>
            <History/>
          </div>
          <PayWidget />
        </div>
      </div>
    </div>
  );
}

export default App;
