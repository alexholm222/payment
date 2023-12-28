import s from './Pro.module.scss';
import logo from '../../image/prologo.png';
import person1 from '../../image/person1.jpg';
import person2 from '../../image/person2.jpg';
import person3 from '../../image/person3.jpg';
import person4 from '../../image/person4.jpg';
import person5 from '../../image/person5.jpg';
import person6 from '../../image/person6.jpg';
import person7 from '../../image/person7.jpg';
import person8 from '../../image/person8.jpg';
import person9 from '../../image/person9.jpg';
import { useEffect, useRef, useState } from 'react';
import ProSucces from '../ProSucces/ProSucces';
import ProError from '../ProError/ProError';
import { disablePro } from '../../Api/Api';
import { enablePro } from '../../Api/Api';
import { addSpaceNumber } from '../../utils/addSpaceNumber';

function Pro({ setOpenModal, month, proSum, date, offModalPro, setOnPro, setOffPro, setOffModalPro, id, setPayWindow, periodPay}) {
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        },)
    }, [])

    function handleCloseModal() {
        setOpenModal(false)
    }

    function closeModalOver(e) {

        if (modalRef.current && !modalRef.current.contains(e.target)) {
            e.stopPropagation()
            setAnim(false);
            handleCloseModal();
        }
    }

    /*  function handleProCurrent() {
      
     } */

    function handlePro() {
        enablePro(date.date, id)
            .then((res) => {
                console.log(res);
                setOnPro(true);
                setOffPro(false);
                setOpenModal(false);
            })
            .catch(err => console.log(err))
    }

    function handleProOff() {
        disablePro(date.date, id)
        .then((res) => {
            console.log(res);
            setOnPro(false);
            setOffPro(true);
            setOffModalPro(false);
            setOpenModal(false);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModalOver);

        return () => document.removeEventListener('mouseup', closeModalOver);
    }, []);
    return (
        <div className={`${s.modalwindow} ${anim && s.modalwindow_anim}`}>
            {/* <ProSucces/> */}
            {/*  <ProError/> */}
            <div ref={modalRef} className={`${s.promodal} ${anim && s.promodal_anim}`}>
                <button onClick={handleCloseModal} className={s.promodal__close}></button>
                <img src={logo} class="promodal__logo" />
                <div className={s.promodal__header}>
                    <div className={`${s.promodal__container} ${s.promodal__container_title}`}>
                        <h3 className={s.promodal__title}>Версия для профессионалов своего дела</h3>
                        <p className={`${s.promodal__text} ${s.promodal__text_second}`}>Для специалистов, предпочитающих в работе<br />удобство и
                            эффективность</p>
                    </div>
                    <div className={`${s.promodal__container} ${s.promodal__container_users}`}>
                        <div className={s.promodal__users}>
                            <div className={s.promodal__image}>
                                <img src={person1}></img>
                            </div>
                            <div className={s.promodal__image}>
                                <img src={person2} />
                            </div>
                            <div className={s.promodal__image}>
                                <img src={person3} />
                            </div>
                            <div className={s.promodal__image}>
                                <img src={person4} />
                            </div>
                            <div className={s.promodal__image}>
                                <img src={person5} />
                            </div>
                            <div className={s.promodal__image}>
                                <img src={person6} />
                            </div>
                            <div className={s.promodal__image}>
                                <img src={person7} />
                            </div>
                            <div className={s.promodal__image}>
                                <img src={person8} />
                            </div>
                            <div className={s.promodal__image}>
                                <img src={person9} />
                            </div>
                        </div>
                        <p className={`${s.promodal__text} ${s.promodal__text_second}`}>Выбор 125 PRO-пользователей</p>
                    </div>
                </div>

                {month === 0 && !periodPay && !offModalPro &&
                    <button onClick={()=> {setPayWindow(true); setOpenModal(false)}} className={s.promodal__button}>
                        <p>Повысить версию до</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10.0515 3.72266H18.5457L13.3548 9.89052H19.0176L7.22007 21.2773L10.0515 13.2117L4.38867 13.2117L10.0515 3.72266Z"
                                stroke="#ECECEC" stroke-width="1.7" stroke-linejoin="round" />
                        </svg>
                        <p>PRO за {addSpaceNumber(proSum)} ₽</p>
                    </button>
                }

                {(month !== 0 || periodPay) && !offModalPro &&
                    <button onClick={handlePro} className={s.promodal__button}>
                        <p>Повысить версию до</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10.0515 3.72266H18.5457L13.3548 9.89052H19.0176L7.22007 21.2773L10.0515 13.2117L4.38867 13.2117L10.0515 3.72266Z"
                                stroke="#ECECEC" stroke-width="1.7" stroke-linejoin="round" />
                        </svg>
                        <p>PRO</p>
                    </button>
                }

                {offModalPro &&
                    <div className={s.buttons}>
                        <button onClick={() => setOpenModal(false)} className={s.remain}>Остаться на  
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10.0515 3.72266H18.5457L13.3548 9.89052H19.0176L7.22007 21.2773L10.0515 13.2117L4.38867 13.2117L10.0515 3.72266Z"
                                stroke="#ECECEC" stroke-width="1.7" stroke-linejoin="round" />
                        </svg>
                         PRO</button>
                        <button onClick={handleProOff} className={s.reduce}>Понизить уровень</button>
                    </div>
                }

                <div className={s.promodal__main}>
                    <p className={`${s.promodal__text} ${s.promodal__text_big}`}>Ключевые преимущества:</p>
                    <ul className={s.promodal__advantages}>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Подробная история заказа</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Назначение на заказы из карты</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Уведомление о заказе в Telegram</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Список резерва и ранее назначенных на заказ</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Период редактирования заказов до 60 дней</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Группировка исполнителей</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Статус о прочтении писем клиентами</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Подстановка факсимиле в PDF документы</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Просмотр всех заказов компании</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>СМС при первом обращении и завершении заказа</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Добавление до 100 исполнителей на заказ</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Отсутствие лимита на звонки из приложения</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Отчеты по заказам и документам</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Скидка до 50% на комиссию по выплатам</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Создание заказа на несколько дат</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Расширенные типы заказов</p>
                        </li>
                        <li className={s.promodal__item}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M1 8.5L2.5 7L6 10.5L13.5 3L15 4.5L6 13.5L1 8.5Z" fill="#87A2FF" />
                            </svg>
                            <p className={s.promodal__text}>Отображение незавершенных задач</p>
                        </li>

                        <li className={s.promodal__item}>
                            <a target="_blank" href="https://lk.skilla.ru/support/?id=487" className={`${s.promodal__text} ${s.promodal__text_link}`}>Узнать
                                подробнее</a>
                        </li>
                    </ul>
                </div>

                <div className={s.promodal__footer}>
                   
                    <div></div>

                    <a target="_blank" href="https://skilla.ru/oferta_new2/" class={`${s.promodal__offer} ${s.promodal__text_second} ${s.promodal__text}`}>
                        Публичная оферта ООО “Скилла Инновации”
                    </a>
                </div>
            </div>
        </div>

    )
};

export default Pro;