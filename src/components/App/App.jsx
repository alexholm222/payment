import s from './App.module.scss';
import PayWidget from '../PayWidget/PayWidget';
import Subscription from '../Subscription/Subscription';
import CalendarMonth from '../CalendarMonth/CalendarMonth';
import Services from '../Services/Services';
import { ReactComponent as ToltipIcon } from '../../image/toltipIcon.svg';
import History from '../History/History';

function App() {
  return (
    <div className={s.app}>
      <div className={s.container}>
        <p className={s.title}>Оплата услуг Skilla</p>
        <div className={s.main}>
          <div className={s.content}>
            <div className={s.header}>
              <div className={s.texts}>
                <p className={s.title_small}>Текущая подписка</p>
                <p className={s.notice}>внесите оплату до 5 января</p>
              </div>
              <CalendarMonth/>
            </div>
            <Subscription/>
            <div className={s.service}>
              <p>Подключенные услуги</p>
              <ToltipIcon />
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
