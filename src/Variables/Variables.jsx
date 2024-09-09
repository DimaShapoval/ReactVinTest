import { NavLink } from 'react-router-dom'
import style from './Variables.module.css'


export default function Variables({ variablesList }) {
    return (
        <div className={style.cards} >
            { variablesList.map((item, index) => {
                return (
                    <div className={`${style.card} container`} key={index}>
                        <NavLink to={`${item.ID}`} >{item.Name}</NavLink >
                    </div>
                )
            }) }
        </div>
    )
}