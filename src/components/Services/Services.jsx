import s from './Services.module.scss';
import Service from '../Service/Service';
import ServiceSub from '../Service/ServiceSub';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { useEffect, useState } from 'react';

function Services({pays, date, month, setOnPro, onPro, setOffPro, 
                   offPro, setDataUpdate, dataUpdate, accountBalance, 
                   periodPay, ban, sumToPay, setBlockSwitch, blockSwitch, accountNum}) {

    return (
        <div className={s.services}>
            {pays?.map((el) => {
                return el.type === 'royalty' ? 
                <ServiceSub date={date} month={month} title={el.name} sum={el.sum}
                            pro={el.is_pro === 0 ? false : true} 
                            activated={el.is_enabled === 0 ? false : true} 
                            disabled={(el.changeable == 0 || ban) ? true : false}
                            paid={el.paid === 1 ? true : false} proSum = {el.pro_sum} 
                            setOnPro={setOnPro} onPro={onPro} setOffPro={setOffPro} 
                            offPro={offPro} partnership={el.partnership} periodPay={periodPay}
                            type={el.type} accountBalance={sumToPay > accountBalance ? accountBalance - sumToPay  : accountBalance} 
                            dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}/>
                        
                             :

                <Service date={date} title={el.name} sum={el.sum} 
                         activated={el.is_enabled === 0 ? false : true} 
                         disabled={(el.changeable == 0 || ban) ? true : false}
                         paid={el.paid === 1 ? true : false}
                         type={el.type} setDataUpdate={setDataUpdate} 
                         dataUpdate={dataUpdate} partnership={el.partnership}
                         accountBalance={sumToPay > accountBalance ? accountBalance - sumToPay : accountBalance} month={month} periodPay={periodPay}
                         setBlockSwitch={setBlockSwitch} blockSwitch={blockSwitch} accountNum={accountNum}/>
            })}
          
        </div>
    )
};

export default Services;