import s from './Subscription.module.scss';

function Subscription() {
    return (
        <div className={s.sub}>
           <p className={`${s.text} ${s.text_top}`}>Начислено</p>
           <p className={s.num}>{`59 532`} ₽</p>
           <div className={s.diagram}>
                <div style={{width: '40%'}} className={`${s.line} ${s.line_pro}`}></div>
                <div style={{width: '20%'}} className={`${s.line} ${s.line_account}`}></div>
                <div style={{width: '30%'}} className={`${s.line} ${s.line_accounting}`}></div>
                <div style={{width: '10%'}} className={`${s.line} ${s.line_seo}`}></div>
           </div>
           <div className={s.block}>
               <div className={`${s.bage} ${s.bage_pro}`}>
                   <div></div> 
                   <p className={s.text}>PRO-подписка<span>{`30 700`} ₽</span></p>
               </div> 

               <div className={`${s.bage} ${s.bage_account}`}>
                   <div></div> 
                   <p className={s.text}>Платеж за аккаунт<span>{`7 632`} ₽</span></p>
               </div> 

               <div className={`${s.bage} ${s.bage_accounting}`}>
                   <div></div> 
                   <p className={s.text}>Бухгалтерские услуги<span>{`5 700`} ₽</span></p>
               </div> 

               <div className={`${s.bage} ${s.bage_seo}`}>
                   <div></div> 
                   <p className={s.text}>Продвижение сайта<span>{`15 500`} ₽</span></p>
               </div> 
           </div>
        </div>
    )
};

export default Subscription;