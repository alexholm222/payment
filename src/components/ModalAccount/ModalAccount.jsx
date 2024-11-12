import s from './ModalAccount.module.scss';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { ReactComponent as IconCard } from '../../image/iconCard.svg';
import { useEffect, useRef, useState } from 'react';
import noPhoto from '../../image/noPhoto.svg';
import Requisites from '../Requisites/Requisites';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { getPayForm } from '../../Api/Api';
import BankResponseLoad from '../BankResponseLoad/BankResponseLoad';

function ModalAccount({ setModal, deposite, name, contract, accountNum }) {
    const [anim, setAnim] = useState(false);
    const [requisites, setRequisites] = useState(false);
    const [sumValue, setSumValue] = useState(deposite || '');
    const [payForm, setPayForm] = useState(500);
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(false);

    const modalRef = useRef();
    const buttonRef = useRef();
    const reqRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    useEffect(() => {

        if(sumValue !== '') {
            getPayForm(sumValue)
            .then((res) => {
                const form = res.data.data.form;
                setPayForm(form)
            })
            .catch(err => console.log(err))
        }
        
    }, [sumValue])

    function closeModal() {
        setAnim(false)
        setTimeout(() => {
            setModal(false)
        }, 400)
        
    }

    function handleOpenReq() {
        setRequisites(true)
    }


    function closeModalOver(e) {

        if (modalRef.current && !modalRef.current.contains(e.target) && !reqRef.current && !buttonRef.current.contains(e.target)) {
            e.stopPropagation()
            setAnim(false);
            closeModal();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModalOver);

        return () => document.removeEventListener('mousedown', closeModalOver);
    }, []);

    function handleInput(e) {
        const value = e.target.value;
        setSumValue(value)
        if(value < 500) {
            setErr(true)
        } else {
            setErr(false)
        }
    }

    return (
        <div className={`${s.modal} ${anim && s.modal_anim}`}>
            {!load &&
                <div ref={modalRef} className={`${s.window} ${anim && s.window_anim}`}>
                    <div className={s.header}>
                        <p>Пополнение лицевого счета</p>
                        <IconClose ref={buttonRef} onClick={closeModal} />
                    </div>
                    
                    <div className={s.card}>
                        <div className={s.avatar}>
                            <img src={noPhoto}></img>

                        </div>
                        <div className={s.block_client}>
                            <p>{name}</p>
                            <span>ЛС №{accountNum}</span>
                        </div>
                    </div>

                    <div className={s.amount}>
                        <p>Сумма зачисления на счет {err && '(от 500 рублей)'}</p>
                        <div className={`${s.input} ${err && s.input_err}`}>
                            <input value={sumValue || ''} onChange={handleInput} type='number'></input>
                            <p>руб</p>
                        </div>
                        <p style={{ fontSize: '14px' }}>Комиссия будет указана в следующем окне</p>
                    </div>

                    <div onClick={() => { setTimeout(() => { setLoad(true) }) }} className={`${s.button} ${err && s.button_disable}`}>
                        <div className={`${s.buttonin}`}>
                            <IconCard />
                            Оплатить картой
                        </div>
                        <div className={s.form} style={{ display: 'flex' }} dangerouslySetInnerHTML={{ __html: payForm }} />
                    </div>

                    <div className={s.container_button}>
                        <button onClick={handleOpenReq} className={s.button_details}>
                            <div className={s.inbutton}>Показать банковские реквизиты</div>
                        </button>
                    </div>
                </div>
            }
            {load && <BankResponseLoad setModalDeposit={setModal} />}

            {requisites && <div className={s.req} ref={reqRef}><Requisites setRequisites={setRequisites} name={name} contract={contract} accountNum={accountNum}/></div>}
        </div>
    )
};

export default ModalAccount;