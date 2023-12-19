import s from './Log.module.scss';

function Log({date, action, service, sum, type}) {
    return (
        <div className={s.log}>
            <div className={s.container}>
                <p className={s.date}>{date}</p>
                <p className={s.action}>{action}<span>{service}</span></p>
            </div>
            {type !== 1 && <p className={s.sum}>{sum} ₽</p>}
            {type === 1 && <p className={`${s.sum} ${s.sum_income}`}>+ {sum} ₽</p>}
        </div>
    )
};

export default Log;