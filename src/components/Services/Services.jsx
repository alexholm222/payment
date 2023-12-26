import s from './Services.module.scss';
import Service from '../Service/Service';
import ServiceSub from '../Service/ServiceSub';
import { addSpaceNumber } from '../../utils/addSpaceNumber';

function Services({pays, date, month}) {
    console.log(pays)
    return (
        <div className={s.services}>
            {pays?.map((el) => {
                return el.type === 'royalty' ? 
                <ServiceSub date={date} month={month} title={el.name} sum={el.sum}
                            pro={el.is_pro === 0 ? false : true} 
                            activated={el.is_enabled === 0 ? false : true} 
                            disabled={el.changeable === 1 ? false : true}
                            paid={el.paid === 1 ? true : false} proSum = {el.pro_sum}/>
                        
                             :

                <Service date={date} title={el.name} sum={el.sum} 
                         activated={el.is_enabled === 0 ? false : true} 
                         disabled={el.changeable === 1 ? false : true}
                         paid={el.paid === 1 ? true : false}
                         type={el.type}/>
            })}
          
        </div>
    )
};

export default Services;