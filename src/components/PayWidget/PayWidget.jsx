import s from './PayWidget.module.scss';
import { ReactComponent as WaletIcon } from '../../image/iconWallet.svg';

function PayWidget() {
    return(
        <div className={s.widget}>
            <div className={s.header}>
                <WaletIcon/>
            </div>
        </div>
    )
};

export default PayWidget;