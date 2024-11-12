import s from './Subscription.module.scss';
import { addSpaceNumber } from '../../utils/addSpaceNumber';

function Subscription({ pays, totalSum, month, date }) {
    console.log(date)
    return (
        <div className={s.sub}>
            {month === 0 && <p className={`${s.text} ${s.text_top}`}>Начислено</p>}
            {month !== 0 && <p className={`${s.text} ${s.text_top}`}>Будет начислено 1 {date.month2}</p>}
            {month < 0 && <p className={`${s.text} ${s.text_top}`}>начислено в {date.month2.slice(0, -1)}е</p>}
            <p className={s.num}>{addSpaceNumber(totalSum)} ₽</p>
            <div className={s.diagram}>
                {pays?.map((el) => {
                    return el.is_enabled == 1 && <div style={{ width: `${ Math.ceil(el.sum/totalSum * 100)}%` }} 
                                                       className={`${s.line} 
                                                       ${el.type === 'royalty' && s.line_pro}
                                                       ${el.type === 'sms' && s.line_account}
                                                       ${el.type === 'buh' && s.line_accounting}
                                                       ${el.type === 'seo' && s.line_seo}
                                                       ${el.type === 'seo_express' && s.line_seo}
                                                       ${el.type === 'call' && s.line_call}
                                                       ${el.type === 'trust_payment' && s.line_trust}
                                                       `}></div>
                })}
                
            </div>
            <div className={s.block}>
                {pays?.map((el) => {
                    return el.is_enabled == 1 && <div className={`${s.bage} 
                                                                   ${el.type === 'royalty' && s.bage_pro}
                                                                   ${el.type === 'sms' && s.bage_account}
                                                                   ${el.type === 'buh' && s.bage_accounting}
                                                                   ${el.type === 'seo' && s.bage_seo}
                                                                   ${el.type === 'seo_express' && s.bage_seo}
                                                                   ${el.type === 'call' && s.bage_call}
                                                                   ${el.type === 'trust_payment' && s.bage_trust}
                                                                   `}>
                        <div></div>
                        <p className={s.text}>{(el.type === 'royalty' && el.is_pro === 1 && el.pro_sum === 0) ? 'Начальная подписка + PRO за 0 руб' : el.name}<span>{addSpaceNumber(el.sum)} ₽</span></p>
                    </div>
                })}
            </div>
        </div>
    )
};

export default Subscription;