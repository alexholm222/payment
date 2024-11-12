import { useState, useEffect } from 'react';
import s from './Service.module.scss';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { ReactComponent as IconLightning } from '../../image/iconLightning.svg';
import { ReactComponent as IconDone } from '../../image/iconDone.svg';
import { ReactComponent as IconArrow } from '../../image/iconArrow.svg';
import prologo  from '../../image/prologo.png';
import Pro from '../Pro/Pro';
import SubModal from '../SubModal/SubModal';
import PayPro from '../PayPro/PayPro';
import ServiceDeposit from '../ServiceDeposit/ServiceDeposit';

function ServiceSub({ title, sum, activated, disabled, pro, date, paid, month, 
                      proSum, setOnPro, onPro, setOffPro, offPro, partnership, 
                      periodPay, type, accountBalance, dataUpdate, setDataUpdate}) {
    const [switchOn, setSwithOn] = useState(false);
    const [descriptionOpen, setDescriptionOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [offModalPro, setOffModalPro] = useState(false);
    const [payWindow, setPayWindow] = useState(false);
    const [modalDeposit, setModalDeposit] = useState(false);
    
    useEffect(() => {
        setSwithOn(false)
    },[date])

    useEffect(() => {
       if(activated) {
        setSwithOn(true)
       } else {
        setSwithOn(false)
       }
    },[date, activated])

    function handleOffPro() {
        if(switchOn) {
            setOpenModal(true);
            setOffModalPro(true)
        }
    }

    function handleOpenDescription() {
        if (descriptionOpen) {
            setDescriptionOpen(false)
        } else {
            setDescriptionOpen(true)
        }
    }

    function handleOpenModal() {
        setOpenModal(true)
    }

    return (
        <div className={`${s.service} ${s.service_sub}`}>
            <div className={`${s.container} ${pro && s.container_second}`}>
                
                {proSum === 0 && pro ?
                <p className={s.text}>{'Начальная подписка'} {partnership.city}<span>{addSpaceNumber(sum)} ₽</span>&nbsp;+<img className={s.prologo} src = {prologo}></img> {' за 0 руб'}</p> 
                 :
                <p className={s.text}>{title} {partnership.city}<span>{addSpaceNumber(sum)} ₽</span></p> 
                }
                {paid && <div className={`${s.paid} ${!pro && !disabled && s.paid_pro}`}><p>Оплачено</p></div>}
                {(pro || disabled)  &&
                    <div onClick={handleOffPro} className={`${s.switch} ${disabled && s.switch_disabled} ${switchOn && !disabled && s.switch_active} ${activated && disabled && s.switch_active}`}>
                        <div></div>
                    </div>
                }

                {!pro && !disabled &&
                    <button onClick={handleOpenModal} className={s.button}>Повысить уровень до <IconLightning/> PRO</button>
                }
            </div>
            <div className={`${s.description} ${descriptionOpen && s.description_open}`}>
                <ul className={s.list}>
                    <li className={s.item}>
                        <IconDone />
                        <p>IT-платформа Skilla IS</p>
                    </li>

                    <li className={s.item}>
                        <IconDone />
                        <p>Мобильное приложение Skilla Работа</p>
                    </li>

                    <li className={s.item}>
                        <IconDone />
                        <p>Чат и линия 8800 с бизнес-консультантами</p>
                    </li>

                    {pro && <li className={s.item}>
                        <IconDone />
                        <p>Льготная комиссия 0.6% на выплаты самозанятым</p>
                    </li>}

                    <li className={s.item}>
                        <IconDone />
                        <p>Контактный центр</p>
                    </li>

                    <li className={s.item}>
                        <IconDone />
                        <p>Ежедневные обновления ПО</p>
                    </li>

                    <li className={s.item}>
                        <IconDone />
                        <p>Доступ к Школе самозанятого</p>
                    </li>

                    <li className={s.item}>
                        <IconDone />
                        <p>Местные и федеральные контракты</p>
                    </li>

                    <li className={s.item}>
                        <IconDone />
                        <p>Функционал выплат самозанятым</p>
                    </li>

                    <li className={s.item}>
                        <IconDone />
                        <p>Разработка и аналитика рекламных кампаний (Яндекс, Авито)</p>
                    </li>

                    <li className={s.item}>
                        <IconDone />
                        <p>Рекомендации по развитию</p>
                    </li>

                    <li className={s.item}>
                        <IconDone />
                        <p>Сообщество 250+ предпринимателей</p>
                    </li>

                    <li className={s.item}>
                        <IconDone />
                        <p>Мероприятия и общение</p>
                    </li>

                </ul>
            </div>
            <button onClick={handleOpenDescription} className={`${s.show} ${descriptionOpen && s.show_open}`}>Показать все опции <IconArrow /></button>
            {openModal && <Pro setOpenModal={setOpenModal} month={month} proSum={proSum} date={date} offModalPro={offModalPro} 
                               setOnPro={setOnPro} setOffPro={setOffPro} setOffModalPro={setOffModalPro} id={partnership.id} 
                               setPayWindow={setPayWindow} periodPay={periodPay} setModalDeposit={setModalDeposit} paid={paid}/>}
            {onPro && <SubModal type={'on'} setOnPro={setOnPro}/>}
            {offPro && <SubModal type={'off'} setOffPro={setOffPro}/>}
            {payWindow && <PayPro setPayWindow={setPayWindow} proSum={proSum} setOnPro={setOnPro} date={date} id={partnership.id} accountBalance={accountBalance}/>}
            {modalDeposit && <ServiceDeposit type={type} sum={sum} setModalDeposit={setModalDeposit} 
                                             title={title} accountBalance={accountBalance} date={date}
                                             partnership={partnership} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}
                                             />}
        </div>
    )
};

export default ServiceSub;