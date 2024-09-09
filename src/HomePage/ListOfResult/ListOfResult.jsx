import style from './ListOfResult.module.css'

export default function ListOfResult({ list }) {
    return (
        <ul className={style.ul} >
            { list.map((item, index) => {
                return (
                    <li key={index} >
                        <p style={ {fontWeight: 'bold'}} >{item.Variable}</p>
                        <p>{item.Value}</p>
                    </li>
                )
            }) }
        </ul>
    )
}