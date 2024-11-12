import s from './Log.module.scss';
import { handleSubscriptionDate } from '../../utils/dates';
import { addSpaceNumber } from '../../utils/addSpaceNumber';

function Log({date, service, sum, type, beznal}) {
    return (
        <div className={s.log}>
            <div className={s.container}>
                <p className={s.date}>{handleSubscriptionDate(date, 0).day} {handleSubscriptionDate(date, 0).monthName}</p>
                {type === 'chargeback' && <p className={s.action}>{`Возврат средств с лицевого счета`}</p>}
                {type === 'refund' && <p className={s.action}>{`Возврат средств за услугу на лицевой счет`}<span>{service}</span></p>}
                {type === 'outcome' && <p className={s.action}>{`Списание с лицевого счета`}<span>{service}</span></p>}
                {type === 'income' && <p className={s.action}>{`Пополнение лицевого счета`}<span>{beznal === 0 ? 'Банковская карта' : 'Расчетный счет'}</span></p>}
            </div>
            {type !== 'income' && <p className={s.sum}>{addSpaceNumber(sum)} ₽</p>}
            {type === 'income' && <p className={`${s.sum} ${s.sum_income}`}>+ {addSpaceNumber(sum)} ₽</p>}
        </div>
    )
};

export default Log;