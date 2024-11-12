import s from './History.module.scss';
import Log from '../Log/Log';

function History({history}) {
    return (
        <div className={s.history}>
            <p className={s.title}>История</p>
            <ul className={s.list}>
                {history.map((el) => {
                    return <Log date={el.date} service={el.service_name} sum={el.sum} type={el.type} beznal={el.beznal}/>
                })}
            </ul>
        </div>
    )
};

export default History;