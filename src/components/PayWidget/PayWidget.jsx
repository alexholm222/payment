import s from './PayWidget.module.scss';
import { ReactComponent as WaletIcon } from '../../image/iconWallet.svg';
import { ReactComponent as ToltipIcon } from '../../image/toltipIcon.svg';
import { ReactComponent as IconAlert } from '../../image/iconAlert.svg';
import { useState } from 'react';
import ModalAccount from '../ModalAccount/ModalAccount';

function PayWidget() {
    const [toltip, setTooltip] = useState(false);
    const [modal, setModal] = useState(false);

    function handleOpenTooltip() {
        setTooltip(true)
    }

    function handleCloseTooltip() {
        setTooltip(false)
    }

    function handleOpenModal() {
        setModal(true)
    }

    return (
        <div className={s.widget}>
            <div className={s.header}>
                <WaletIcon />
                <p className={s.account}>Лицевой счет № {`123446789`}</p>
            </div>
            <p className={`${s.sub}`}></p>
            <p className={s.balance}>{`20 500`} ₽</p>
            {<div className={s.noticefail}>
                <div className={s.container}>
                    <IconAlert />
                    <p>Пополните счет</p>
                </div>
                <div className={s.container_bottom}>
                    <p>к оплате до 5 января 59 532 ₽</p>
                    <ToltipIcon />
                </div>
            </div>}

            {/* {<div className={s.notice}>
                <p>к оплате до 5 февраля 49 532 ₽</p>
                <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                    <ToltipIcon />
                </div>
                <div className={`${s.tooltip} ${toltip && s.tooltip_open}`}>
                    <div className={s.arrow}></div>
                    <div className={s.item}>
                        <p>PRO-подписка</p><span>30 700 ₽</span>
                    </div>

                    <div className={s.item}>
                        <p>PRO-подписка</p><span>30 700 ₽</span>
                    </div>

                    <div className={s.item}>
                        <p>PRO-подписка</p><span>30 700 ₽</span>
                    </div>
                </div>
            </div>} */}
            <button onClick={handleOpenModal} className={s.button}>Пополнить</button>
            {modal && <ModalAccount setModal={setModal} />}
        </div>
    )
};

export default PayWidget;