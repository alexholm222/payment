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

function Pro({setOpenModal}) {
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        },)
    },[])

    function handleCloseModal() {
        setOpenModal(false)
    }

    function closeModalOver(e) {

        if (modalRef.current &&  !modalRef.current.contains(e.target)) {
            e.stopPropagation()
            setAnim(false);
            handleCloseModal();
        }
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

                <button className={s.promodal__button}>
                    <p>Повысить версию до</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10.0515 3.72266H18.5457L13.3548 9.89052H19.0176L7.22007 21.2773L10.0515 13.2117L4.38867 13.2117L10.0515 3.72266Z"
                            stroke="#ECECEC" stroke-width="1.7" stroke-linejoin="round" />
                    </svg>
                    <p>PRO за 10 000 ₽</p>
                </button>

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
                 {/*    <div className={s.promodal__deadlines}>
                        <div className={`${s.promodal__deadline} ${s.promodal__deadline_bad}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <circle cx="9" cy="9" r="9" fill="#E75A5A" />
                                <path d="M5.625 5.625L12.375 12.375M12.375 5.625L5.625 12.375" stroke="#F1F4F9"
                                    stroke-width="1.575" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p className={s.promodal__text}>истек срок действия 31 декабря 2023</p>
                        </div>

                        <div className={`${s.promodal__deadline} ${s.promodal__deadline_good}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <circle cx="9" cy="9" r="9" fill="#2EA96E" />
                                <path d="M4.5 8.71875L7.82331 12.0421C7.85207 12.0708 7.89851 12.0714 7.928 12.0434L13.5 6.75"
                                    stroke="#F1F4F9" stroke-width="1.8" stroke-linecap="round" />
                            </svg>
                            <p className={s.promodal__text}>входит бесплатно в начальную версию до 31 декабря 2023</p>
                        </div>

                        <div className={`${s.promodal__deadline} ${s.promodal__deadline_open}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <circle cx="9" cy="9" r="9" fill="#9397A6" />
                                <path d="M4.5 8.71875L7.82331 12.0421C7.85207 12.0708 7.89851 12.0714 7.928 12.0434L13.5 6.75" stroke="#F1F4F9" stroke-width="1.8" stroke-linecap="round" />
                            </svg>
                            <p className={s.promodal__text}>оплачена до 31 ноября 2023</p>
                        </div>
                    </div> */}
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