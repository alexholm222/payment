import s from './Services.module.scss';
import Service from '../Service/Service';
import ServiceSub from '../Service/ServiceSub';
import { addSpaceNumber } from '../../utils/addSpaceNumber';

function Services({pays, date, month, setOnPro, onPro, setOffPro, 
                   offPro, setDataUpdate, dataUpdate, accountBalance, 
                   periodPay, ban}) {

    return (
        <div className={s.services}>
            {pays?.map((el) => {
                return el.type === 'royalty' ? 
                <ServiceSub date={date} month={month} title={el.name} sum={el.sum}
                            pro={el.is_pro === 0 ? false : true} 
                            activated={el.is_enabled === 0 ? false : true} 
                            disabled={(el.changeable === 0 || ban) ? true : false}
                            paid={el.paid === 1 ? true : false} proSum = {el.pro_sum} 
                            setOnPro={setOnPro} onPro={onPro} setOffPro={setOffPro} 
                            offPro={offPro} partnership={el.partnership} periodPay={periodPay}/>
                        
                             :

                <Service date={date} title={el.name} sum={el.sum} 
                         activated={el.is_enabled === 0 ? false : true} 
                         disabled={(el.changeable === 0 || ban) ? true : false}
                         paid={el.paid === 1 ? true : false}
                         type={el.type} setDataUpdate={setDataUpdate} 
                         dataUpdate={dataUpdate} partnership={el.partnership}
                         accountBalance={accountBalance} month={month} periodPay={periodPay}/>
            })}
          
        </div>
    )
};

export default Services;