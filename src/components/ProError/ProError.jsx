import s from './ProError.module.scss';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as ErrorModal } from '../../image/errorModal.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { ReactComponent as IconCard } from '../../image/iconCard.svg';
import { getPayForm } from '../../Api/Api';
import BankResponseLoad from '../BankResponseLoad/BankResponseLoad';

function ProError({ depositSum, setPayWindow }) {
    const [anim, setAnim] = useState(false);
    const [payForm, setPayForm] = useState('');
    const [load, setLoad] = useState(false);
    const modalRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    function handleCloseModal() {
        setPayWindow(false)
    }

    useEffect(() => {
        getPayForm(depositSum)
            .then((res) => {
                const form = res.data.data.form;
                setPayForm(form)
            })
            .catch(err => console.log(err))
    },[depositSum])
    {/* <div ref={formRef} style={{display: 'none'}} dangerouslySetInnerHTML={{__html: payForm}}/> */ }
    /*  function handlePayCard() {
         
     } */

    function closeModalOver(e) {

        if (modalRef.current && !modalRef.current.contains(e.target)) {
            e.stopPropagation()
            handleCloseModal();
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModalOver);

        return () => document.removeEventListener('mouseup', closeModalOver);
    }, []);

    return (
        
        <div className={s.window}>
            {!load &&
            <div ref={modalRef} className={`${s.error} ${anim && s.error_anim}`}>
                <ErrorModal />
                <p className={s.title}>Недостаточно средств</p>
                <p className={s.text}>Пополните счет чтобы подключить PRO-подписку</p>
                <button onClick={() => {setTimeout(() => {setLoad(true)})}} className={s.button}>
                    <div className={s.inbutton}><IconCard />Пополнить счет</div>
                    <div className={s.form}style={{ display: 'flex' }} dangerouslySetInnerHTML={{ __html: payForm }} />
                </button>

                <div onClick={handleCloseModal} className={s.close}><IconClose /></div>
            </div>
        }
            {load && <BankResponseLoad setModalDeposit={setPayWindow} />}
        </div>
    )
};

export default ProError;