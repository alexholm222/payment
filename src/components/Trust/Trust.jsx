import s from './Trust.module.scss';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { ReactComponent as ArrowDown } from '../../image/arrowDown.svg';
import { useState, useRef, useEffect } from 'react';
import TrustSuccess from './TrustSuccess';
import { trustPay } from '../../Api/Api';

function Trust({ setTrust,  setDataUpdate, dataUpdate}) {
    const [openMenu, setOpenMenu] = useState(false);
    const [anim, setAnim] = useState(false);
    const [day, setDay] = useState(3);
    const [idForMenu, setIdForMenu] = useState(3);
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState(false);
    const [price, setPrice] = useState(335);
    const modalRef = useRef();
    console.log(day)
    function handleOpenMenu() {
        if (openMenu) {
            setOpenMenu(false)
        } else {
            setOpenMenu(true)
        }
    }

    function handleDay(e) {
        const id = e.currentTarget.id;
        if (id === '3') {
            setDay(3);
            setPrice(335);
            setTimeout(() => {
                setIdForMenu(3)
            }, 250)
            return
        }

        if (id === '7') {
            setDay(7);
            setPrice(428);
            setTimeout(() => {
                setIdForMenu(7)
            }, 250)
            return
        }

        if (id === '10') {
            setDay(10);
            setPrice(475);
            setTimeout(() => {
                setIdForMenu(10)
            }, 250)
            return
        }
    }

    function handleClose() {
        setAnim(false)

        setTimeout(() => {
            setTrust(false);
        }, 400)
    }

    function handleEnableTrust() {
        trustPay(day)
            .then((res) => {
                const status = res.data.data.status;

                if (status === 'created') {
                    setSuccess(true);
                    setDataUpdate(dataUpdate + 1)
                    return
                }

                if (status === 'unavailable') {
                    setErr(true);
                    setDataUpdate(dataUpdate + 1)
                    return
                }

            })
            .catch((err) => {
                setErr(true);
            })
    }

    function closeModalOver(e) {

        if (modalRef.current && !modalRef.current.contains(e.target)) {
            e.stopPropagation()
            handleClose();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModalOver);

        return () => document.removeEventListener('mousedown', closeModalOver);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    return (
        <div className={s.window}>
            <div className={`${s.overlay} ${anim && s.overlay_anim}`}></div>

            {!success && !err &&
                <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim}`}>
                    <div className={s.header}>
                        <p>Доверительный платеж</p>
                        <IconClose onClick={handleClose} />
                    </div>

                    <div className={s.block}>
                        <p>Отложить срок оплаты и внести платеж через:</p>
                        <div className={s.contaier}>
                            <div onClick={handleOpenMenu} className={`${s.input} ${openMenu && s.input_open}`}>
                                <p>{day} {day == 3 ? 'дня' : 'дней'}</p>
                                <ArrowDown />
                            </div>
                            <div onClick={handleOpenMenu} className={`${s.popup} ${openMenu && s.popup_open}`}>
                                {idForMenu !== 3 &&
                                    <div onClick={handleDay} id='3' className={s.item}>
                                        <p>3 дня</p>
                                    </div>
                                }

                                {idForMenu !== 7 &&
                                    <div onClick={handleDay} id='7' className={s.item}>
                                        <p>7 дней</p>
                                    </div>
                                }

                                {idForMenu !== 10 &&
                                    <div onClick={handleDay} id='10' className={s.item}>
                                        <p>10 дней</p>
                                    </div>
                                }

                            </div>
                        </div>

                    </div>

                    <button onClick={handleEnableTrust} className={s.button}>Подключить за {price} ₽/день</button>
                </div>
            }

            {success && <TrustSuccess day={day} setTrust={setTrust} modalRef={modalRef} setAnim={setAnim} anim={anim} err={false} />}
            {err && <TrustSuccess setTrust={setTrust} modalRef={modalRef} setAnim={setAnim} anim={anim} err={true} />}
        </div>
    )
};

export default Trust;