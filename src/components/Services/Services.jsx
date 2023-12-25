import s from './Services.module.scss';
import Service from '../Service/Service';
import ServiceSub from '../Service/ServiceSub';

function Services() {
    return (
        <div className={s.services}>
            <ServiceSub title={'Начальная подписка'} sum={20700} activated={true} disabled={true} />
            <Service title={'Платеж за аккаунт (1 шт.)'} sum={7632} activated={true} disabled={true} />
            <Service title={'Контактный центр'} sum={21} activated={true} disabled={true} />
            <Service title={'Контактный центр'} sum={21} activated={true} disabled={true} />
            <Service title={'Бухгалтерские услуги'} sum={5700} activated={false} disabled={false} />
            <Service title={'Бухгалтерские услуги'} sum={5700} activated={false} disabled={false} />
        </div>
    )
};

export default Services;