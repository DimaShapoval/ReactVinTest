import { useEffect, useState } from 'react'
import style from './VariablesInfo.module.css'
import { useParams } from 'react-router-dom';


export default function VariablesInfo({ variablesList, getCurrentVariableInfo }) {
    const [variableInfo, setVariableInfo] = useState(null);
    const { variablesId } = useParams();

    useEffect(() => {
        getVariableInfo();
    }, [variablesList])

    async function getVariableInfo() {
        setVariableInfo(await getCurrentVariableInfo(variablesId));
    }

    return (
        <div className={`container ${style.wrapper}`} >
            {variableInfo ? <>
                <h3>{variableInfo.Name}</h3>
                <div className={style.infoWrapper} >
                    <p>Group Name: <span>{variableInfo.GroupName}</span></p>
                    <div className={`container ${style.description}`}>
                        Description:
                        <div dangerouslySetInnerHTML={{ __html: variableInfo.Description }}></div>
                    </div>
                </div>

            </> : null}

        </div>
    )
}