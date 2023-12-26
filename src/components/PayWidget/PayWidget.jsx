import s from './PayWidget.module.scss';
import { ReactComponent as WaletIcon } from '../../image/iconWallet.svg';
import { ReactComponent as ToltipIcon } from '../../image/toltipIcon.svg';
import { ReactComponent as IconAlert } from '../../image/iconAlert.svg';
import { useState, useEffect } from 'react';
import { getPaymentList } from '../../Api/Api';
import ModalAccount from '../ModalAccount/ModalAccount';
import { addSpaceNumber } from '../../utils/addSpaceNumber';

function PayWidget({ date }) {
    const [toltip, setTooltip] = useState(false);
    const [modal, setModal] = useState(false);
    const [accountNum, setAccountNum] = useState('');
    const [accountBalance, setAccountBalance] = useState(0);
    const [sumToPay, setSumToPay] = useState(0);
    const [payList, setPayList] = useState([]);

    useEffect(() => {

        getPaymentList('2023-12-12')
            .then((res) => {
                const data = res.data.data;
                setAccountNum(data.account_number);
                setAccountBalance(data.account_balance);
                setSumToPay(data.to_pay.total_sum);
                setPayList(data.to_pay.items);
                console.log(data);

            })
            .catch(err => console.log(err))
    }, []);


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
                <p className={s.account}>Лицевой счет № {accountNum}</p>
            </div>
            <p className={`${s.sub}`}></p>
            <p className={s.balance}>{addSpaceNumber(accountBalance)} ₽</p>

            {sumToPay > 0 && <div className={s.noticefail}>
                <div className={s.container}>
                    <IconAlert />
                    <p>Пополните счет</p>
                </div>
                <div className={s.container_bottom}>
                    <p className={s.text_bottom}>к оплате до 5 {date?.monthNameNow} {addSpaceNumber(sumToPay)} ₽</p>
                    <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                        <ToltipIcon />
                    </div>

                    <div className={`${s.tooltip} ${s.tooltip_fail} ${toltip && s.tooltip_open}`}>
                    <div className={s.arrow}></div>
                    {payList?.map((el) => {
                        return  <div className={s.item}>
                        <p>{el.name}</p><span>{addSpaceNumber(el.sum)} ₽</span>
                    </div>
                    })}
                </div>
                </div>
            </div>}

            {sumToPay <= 0 && <div className={s.notice}>
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
            </div>}
            <button onClick={handleOpenModal} className={s.button}>Пополнить</button>
            {modal && <ModalAccount setModal={setModal} />}
        </div>
    )
};

export default PayWidget;