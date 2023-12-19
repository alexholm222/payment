import s from './History.module.scss';
import Log from '../Log/Log';

function History() {
    return (
        <div className={s.history}>
            <p className={s.title}>История</p>
            <ul className={s.list}>
                <Log date={`6 января`} action={`Списание с лицевого счета`} service={`Услуги бухгалтера`} sum={`5 700`} type={1}/>
                <Log date={`6 января`} action={`Списание с лицевого счета`} service={`Услуги бухгалтера`} sum={`5 700`} type={0}/>
                <Log date={`6 января`} action={`Списание с лицевого счета`} service={`Услуги бухгалтера`} sum={`5 700`} type={0}/>
                <Log date={`6 января`} action={`Списание с лицевого счета`} service={`Услуги бухгалтера`} sum={`5 700`} type={1}/>
                <Log date={`6 января`} action={`Списание с лицевого счета`} service={`Услуги бухгалтера`} sum={`5 700`} type={0}/>
                <Log date={`6 января`} action={`Списание с лицевого счета`} service={`Услуги бухгалтера`} sum={`5 700`} type={0}/>
            </ul>
        </div>
    )
};

export default History;