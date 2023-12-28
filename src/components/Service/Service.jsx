import { useEffect, useState } from 'react';
import s from './Service.module.scss';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { enableBuh, disableBuh, enableSeo, disableSeo, enableSeoEx, disableSeoEx } from '../../Api/Api';
import ServiceDeposit from '../ServiceDeposit/ServiceDeposit';

function Service({ title, sum, activated, disabled, date, paid, type, 
                   setDataUpdate, dataUpdate, partnership, accountBalance, 
                   month, periodPay }) {
    const [switchOn, setSwithOn] = useState(false);
    const [modalDeposit, setModalDeposit] = useState(false);

    useEffect(() => {
        activated ? setSwithOn(true) : setSwithOn(false)
    }, [date, dataUpdate])

    useEffect(() => {
        if (activated) {
            setSwithOn(true)
        } else {
            setSwithOn(false)
        }
    }, [activated])

    function handleSwitch() {
        if (switchOn) {
            if (type === 'buh' && !disabled) {
                disableBuh(date.date, partnership.id)
                    .then((res) => {
                        const data = res.data.data
                        console.log(res)
                        data.status === 'changed' && setDataUpdate(dataUpdate + 1)
                    })
                    .catch(err => console.log(err));
                return
            }

            if (type === 'seo' && !disabled) {
                disableSeo(date.date, partnership.id)
                    .then((res) => {
                        const data = res.data.data
                        console.log(res)
                        if(data.status === 'changed') {
                            setDataUpdate(dataUpdate + 1);
                            return
                        }
                    })
                    .catch(err => console.log(err));
                return
            }

            if (type === 'seo_express' && !disabled) {
                disableSeoEx(date.date, partnership.id)
                    .then((res) => {
                        const data = res.data.data
                        console.log(res)
                        data.status === 'changed' && setDataUpdate(dataUpdate + 1)
                    })
                    .catch(err => console.log(err));
                return
            }
        } else {
            if (type === 'buh' && !disabled) {
                enableBuh(date.date, partnership.id)
                    .then((res) => {
                        setDataUpdate(dataUpdate - 1);
                        const data = res.data.data
                       /*  if(data.status === 'deposit') {
                            setModalDeposit(true);
                            setDepositSum(data.sum);
                            return
                        } */
                    })
                    .catch(err => console.log(err))
                return
            }

            if (type === 'seo' && !disabled) {
                enableSeo(date.date, partnership.id)
                    .then((res) => {
                        console.log(res)
                        const data = res.data.data;

                        if(data.status === 'changed') {
                            disableSeoEx(date.date, partnership.id)
                            .then((res) => {
                                const data = res.data.data
                            })
                            .catch(err => console.log(err));
                            setDataUpdate(dataUpdate - 1);
                            return
                        }
                    })
                    .catch(err => console.log(err))
                return
            }

            if (type === 'seo_express' && !disabled) {
                enableSeoEx(date.date, partnership.id)
                    .then((res) => {
                        const data = res.data.data;
                    
                        if(data.status === 'changed') {
                            disableSeo(date.date, partnership.id)
                            .then((res) => {
                                const data = res.data.data
                            })
                            .catch(err => console.log(err));
                            setDataUpdate(dataUpdate - 1);
                            return
                        }
                    })
                    .catch(err => console.log(err))
                return
            }
        }
    }

    return (
        <div className={s.service}>
            <p className={s.text}>{title} {partnership.city}<span>{addSpaceNumber(sum)} ₽</span></p>
            {paid && <div className={s.paid}><p>Оплаченно</p></div>}
            <div onClick={() => {month === 0 && !periodPay ? setModalDeposit(true) : handleSwitch()}} className={`${s.switch} ${disabled && s.switch_disabled} ${switchOn && !disabled && s.switch_active} ${activated && disabled && s.switch_active}`}>
                <div></div>
            </div>
            {modalDeposit && <ServiceDeposit type={type} sum={sum} setModalDeposit={setModalDeposit} 
                                             title={title} accountBalance={accountBalance} date={date}
                                             partnership={partnership} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}
                                             />}
        </div>
    )
};

export default Service;