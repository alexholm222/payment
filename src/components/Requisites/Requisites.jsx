import s from './Requisites.module.scss';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { ReactComponent as IconWarning } from '../../image/iconWarning.svg';
import { useState, useEffect, useRef } from 'react';

function Requisites({ setRequisites }) {
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();
    const buttonRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    function closeRequisites() {
        setRequisites(false)
    }

    function closeModalOver(e) {
        if (modalRef.current && !modalRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            e.stopPropagation()
            setAnim(false);
            closeRequisites();
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModalOver);

        return () => document.removeEventListener('mouseup', closeModalOver);
    }, []);

    return (
        <div className={s.window}>
            <div ref={modalRef} className={`${s.requisites} ${anim && s.requisites_anim}`}>
                <div className={s.header}>
                    <p className={s.title}>Реквизиты для перевода</p>
                    <IconClose ref={buttonRef} onClick={closeRequisites} />
                </div>

                <div className={s.bage}>
                    <IconWarning />
                    <p>При совпадении назначения платежа с образцом, срок зачисления средств - до 1 рабочего дня, иначе - до 7 дней</p>
                </div>

                <div className={s.lines}>
                    <div className={s.line}>
                        <p className={s.textsec}>Получатель:</p>
                        <p className={s.text}>ООО “Скилла Инновации”</p>
                    </div>

                    <div className={s.line}>
                        <p className={s.textsec}>ИНН:</p>
                        <p className={s.text}>4706050219</p>
                    </div>

                    <div className={s.line}>
                        <p className={s.textsec}>КПП:</p>
                        <p className={s.text}>780601001</p>
                    </div>

                    <div className={s.line}>
                        <p className={s.textsec}>Банк получателя:</p>
                        <p className={s.text}>СЕВЕРО-ЗАПАДНЫЙ БАНК ПАО СБЕРБАНК</p>
                    </div>

                    <div className={s.line}>
                        <p className={s.textsec}>БИК:</p>
                        <p className={s.text}>044030653</p>
                    </div>

                    <div className={s.line}>
                        <p className={s.textsec}>Расчетный счет:</p>
                        <p className={s.text}>40702810155000102680</p>
                    </div>

                    <div className={s.line}>
                        <p className={s.textsec}>Корр. счет:</p>
                        <p className={s.text}>30101810500000000653</p>
                    </div>

                    <div className={s.line}>
                        <p className={s.textsec}>Назначение платежа:</p>
                        <p className={s.text}>Лицензионный платёж ЛС{`123456789`}<br></br>по договору № {`20200805–11`} от {`01.03.2023`}</p>
                    </div>
                </div>

            </div>
        </div>

    )
};

export default Requisites;