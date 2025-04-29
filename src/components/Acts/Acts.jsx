import s from './Acts.module.scss';
import { ReactComponent as IconAct } from '../../image/IconAct.svg';
import { useEffect, useState } from 'react';
import { handleDatesForActs } from '../../utils/dates';

function Acts({ actsList }) {
    const [activYear, setActiveYear] = useState(handleDatesForActs().year);
    const [years, setYears] = useState([]);
 
    useEffect(() => {
        setYears(Object.keys(actsList));
    }, [actsList])


    function handleChangeButton(e) {
        const id = Number(e.currentTarget.id);
        setActiveYear(id)
    }
    return (
        <div style={{display: years.length == 0 ? 'none' : ''}} className={s.acts}>
            <div className={s.header}>
                <IconAct />
                <p>Закрывающие документы</p>
            </div>
            <div className={s.buttons}>
                {years?.map((el) => {
                    return <div id={el} onClick={handleChangeButton} className={`${s.button} ${activYear == el && s.button_active}`}>{el} год</div>
                })}
            </div>

            <div className={s.container}>
                {actsList[activYear]?.map((el) => {
                    return <a target='_blank' href={el.link} className={s.link}>{handleDatesForActs(el.date).fMonth}</a>
                })}
            </div>
        </div>
    )
};

export default Acts;