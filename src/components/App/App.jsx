import s from './App.module.scss';
import PayWidget from '../PayWidget/PayWidget';
import Subscription from '../Subscription/Subscription';

function App() {
  return (
    <div className={s.app}>
      <div className={s.container}>
        <p className={s.title}>Оплата услуг Skilla</p>
        <div className={s.main}>
          <div className={s.content}>
            <Subscription />
          </div>
          <PayWidget />
        </div>
      </div>
    </div>
  );
}

export default App;
