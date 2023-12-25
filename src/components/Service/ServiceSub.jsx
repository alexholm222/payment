import { useState } from 'react';
import s from './Service.module.scss';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { ReactComponent as IconLightning } from '../../image/iconLightning.svg';
import { ReactComponent as IconDone } from '../../image/iconDone.svg';
import { ReactComponent as IconArrow } from '../../image/iconArrow.svg';
import Pro from '../Pro/Pro';

function ServiceSub({ title, sum, activated, disabled }) {
    const [switchOn, setSwithOn] = useState(false);
    const [descriptionOpen, setDescriptionOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    function handleSwitch() {
        if (switchOn) {
            !disabled && setSwithOn(false)
        } else {
            !disabled && setSwithOn(true)
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
            <div className={s.container}>
                <p className={s.text}>{title}<span>{addSpaceNumber(sum)} ₽</span></p>
                {/* <div onClick={handleSwitch} className={`${s.switch} ${disabled && s.switch_disabled} ${switchOn && !disabled && s.switch_active} ${activated && disabled && s.switch_active}`}>
                <div></div>
            </div> */}
                <button onClick={handleOpenModal} className={s.button}>Повысить уровень до <IconLightning /> PRO</button>
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
                        <p>Команда сопровождения: бухгалтер, юрист, дизайнер</p>
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
                        <p>сообщество 250+ предпринимателей</p>
                    </li>

                    <li className={s.item}>
                        <IconDone />
                        <p>Мероприятия и общение</p>
                    </li>

                </ul>
            </div>
            <button onClick={handleOpenDescription} className={`${s.show} ${descriptionOpen && s.show_open}`}>Показать все опции <IconArrow/></button>
                {openModal && <Pro setOpenModal={setOpenModal}/>}
        </div>
    )
};

export default ServiceSub;