import { useEffect, useState } from 'react';
import s from './Service.module.scss';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { enableBuh, disableBuh, enableSeo, disableSeo, enableSeoEx, disableSeoEx } from '../../Api/Api';
import ServiceDeposit from '../ServiceDeposit/ServiceDeposit';

function Service({ title, sum, activated, disabled, date, paid, type,
    setDataUpdate, dataUpdate, partnership, accountBalance,
    month, periodPay, setBlockSwitch, blockSwitch, accountNum }) {
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
        setBlockSwitch(true)
        if (switchOn) {

            if (type === 'buh' && !disabled && !blockSwitch) {
                disableBuh(date.date, partnership.id)
                    .then((res) => {
                        const data = res.data.data;
                        console.log(data)
                        data.status === 'changed' && setDataUpdate(dataUpdate + 1);
                      
                    })
                    .catch(err => {
                        console.log(err);
                        setBlockSwitch(false)
                    })

                return
            }

            if (type === 'seo' && !disabled && !blockSwitch) {
                disableSeo(date.date, partnership.id)
                    .then((res) => {
                        const data = res.data.data

                        if (data.status === 'changed') {
                            setDataUpdate(dataUpdate + 1);
                            return
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setBlockSwitch(false)
                    })
                   
                return
            }

            if (type === 'seo_express' && !disabled && !blockSwitch) {
                disableSeoEx(date.date, partnership.id)
                    .then((res) => {
                        const data = res.data.data
                        data.status === 'changed' && setDataUpdate(dataUpdate + 1)
                    })
                    .catch(err => {
                        console.log(err);
                        setBlockSwitch(false)
                    })
                return
            }
        } else {

            if (month === 0) {
                setModalDeposit(true);
                return
            }

            if (type === 'buh' && !disabled && !blockSwitch) {
                enableBuh(date.date, partnership.id)
                    .then((res) => {
                        const data = res.data.data;
                        console.log(res)
                        if (data.status === 'changed') {
                            setDataUpdate(dataUpdate - 1);
                        }

                        if (data.status === 'deposit') {
                            setBlockSwitch(false);
                            setModalDeposit(true);
                            return
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setBlockSwitch(false);
                    })
                return
            }

            if (type === 'seo' && !disabled && !blockSwitch) {
                enableSeo(date.date, partnership.id)
                    .then((res) => {
                        const data = res.data.data;
                        console.log(data)
                        if (data.status === 'changed') {
                            disableSeoEx(date.date, partnership.id)
                                .then((res) => {
                                    const data = res.data.data
                                })
                                .catch(err => {
                                    console.log(err);
                                    setBlockSwitch(false)
                                })
                            setDataUpdate(dataUpdate - 1);
                            return
                        }

                        if (data.status === 'deposit') {
                            setModalDeposit(true);
                            setBlockSwitch(false);
                            return
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setBlockSwitch(false)
                    })
                return
            }

            if (type === 'seo_express' && !disabled && !blockSwitch) {
                enableSeoEx(date.date, partnership.id)
                    .then((res) => {
                        const data = res.data.data;

                        if (data.status === 'changed') {
                            disableSeo(date.date, partnership.id)
                                .then((res) => {
                                    const data = res.data.data
                                })
                                .catch(err => {
                                    console.log(err);
                                    setBlockSwitch(false)
                                })
                            setDataUpdate(dataUpdate - 1);
                            return
                        }

                        if (data.status === 'deposit') {
                            setModalDeposit(true);
                            setBlockSwitch(false);
                            return
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setBlockSwitch(false)
                    })
                return
            }
        }
    }

    return (
        <div className={s.service}>
            {type !== 'sms' && <p className={s.text}>Опция "{title}" {partnership.city} {accountNum == '000036951' && `"${partnership.brand.name}"`}<span>{addSpaceNumber(sum)} {'₽'}</span></p>}
            {type == 'sms' && <p className={s.text}>{title} {partnership.city} {accountNum == '000036951' && `"${partnership.brand.name}"`}<span>{addSpaceNumber(sum)} {'₽'}</span></p>}
            {paid && <div className={s.paid}><p>Оплачено</p></div>}
            <div onClick={() => { month === 0 && !periodPay ? setModalDeposit(true) : handleSwitch() }} className={`${s.switch} ${blockSwitch && s.switch_block} ${disabled  && s.switch_disabled} ${switchOn && !disabled && s.switch_active} ${activated && disabled && s.switch_active}`}>
                <div></div>
            </div>
            {modalDeposit && <ServiceDeposit type={type} sum={sum} setModalDeposit={setModalDeposit} setBlockSwitch={setBlockSwitch}
                title={title} accountBalance={accountBalance} date={date}
                partnership={partnership} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}
            />}
        </div>
    )
};

export default Service;