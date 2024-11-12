import s from './Partner.module.scss';
import { ReactComponent as IconAccCard } from '../../image/iconAccCard.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useEffect, useRef, useState } from 'react';


function Partner({ contract, name, accountNum, inn, phone, email }) {
    const [modal, setModal] = useState(false);
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();

    function handleOpen() {
        setTimeout(() => {
            setAnim(true)
        })
        setModal(true)
    }

    function handleClose() {
        setTimeout(() => {
            setModal(false)
        }, 400)
        setAnim(false)
    }

    function closeModalOver(e) {

        if (modalRef.current && !modalRef.current.contains(e.target)) {
            e.stopPropagation();
            handleClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModalOver);

        return () => document.removeEventListener('mousedown', closeModalOver);
    }, []);

    return (
        <>
            <div className={s.partner}>
                <div className={s.header}>
                    <IconAccCard />
                    <p>Бизнес-партнер</p>
                </div>
                <div className={s.requisite}>
                    <div className={s.item}>
                        <span>Договор</span>
                        <p>{contract}</p>
                    </div>
                    <div className={s.item}>
                        <span>Партнер</span>
                        <p>{name}</p>
                    </div>
                    <div className={s.item}>
                        <span>ИНН</span>
                        <p>{inn}</p>
                    </div>
                    <div className={s.item}>
                        <span>Лицевой счет</span>
                        <p>{accountNum}</p>
                    </div>

                    <div className={s.item}>
                        <span>Телефон</span>
                        <p>{phone === '' ? '—' : phone}</p>
                    </div>

                    <div className={s.item}>
                        <span>E-mail</span>
                        <p>{email === '' ? '—' : email}</p>
                    </div>
                </div>
                <p onClick={handleOpen} className={s.button}>Перезаключить договор</p>
            </div>
            {modal &&
                <div className={`${s.window} ${anim && s.window_anim}`}>
                    <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim}`}>
                        <div className={s.top}>
                            <p>Перезаключение договора</p>
                            <IconClose onClick={handleClose}/>
                        </div>

                        <p className={s.text}>Договор может быть перезаключен при отсутствии<br></br> задолженности только на ИП или ООО. Стоимость<br></br> перезаключения договора на аффилированное лицо — 15 000 ₽,<br></br> на неаффилированное лицо — 75 000 ₽.</p>
                        <p className={s.text2}>Основание — пункт 3.1.10.1. Оферты: “Заменить сторону по<br></br> Договору, заключив соответствующее трехстороннее<br></br> соглашение (или через расторжение и заключение нового<br></br> договора с третьей стороной). Стоимость замены на<br></br> аффилированное лицо составляет 15 000 руб., на не <br></br>аффилированное — 75 000 руб. Стоимость может включать<br></br> услугу курьерской доставки оригиналов договора в обе<br></br> стороны.”</p>
                        <p className={s.text2}>Чтобы перезаключить договор обратитесь в чат к бизнес-<br></br> ассистентам</p>
                    </div>
                </div>
            }
        </>
    )
};

export default Partner;