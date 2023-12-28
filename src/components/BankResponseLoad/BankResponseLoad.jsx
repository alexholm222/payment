import s from './BankResponseLoad.module.scss';
import { useRef, useEffect } from 'react';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import Loader from '../Loader/Loader';

function BankResponseLoad({ setModalDeposit }) {
    const modalRef = useRef();

    function handleCloseModal() {
        setModalDeposit(false)
    }

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
        <div ref={modalRef} className={s.container}>
            <Loader />
            <p>Ожидаем ответ от банка</p>
            <div onClick={handleCloseModal}>
                <IconClose />
            </div>

        </div>
    )
};

export default BankResponseLoad;