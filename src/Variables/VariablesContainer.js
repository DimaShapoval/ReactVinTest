import { useEffect, useState } from "react"
import Variables from "./Variables"
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import VariablesInfo from "./VariablesInfo/VariablesInfo";
import Loader from "../Loader/Loader";
import style from './Variables.module.css'

export default function VariablesContainer() {
    const [variablesList, setVariablesList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json')
        .then(res => {
            setLoader(true)
            let data = res.data
            setVariablesList(data.Results)
        })
        .catch(error => {
            setErrorMessage(error.message)
        })
        .finally(() => { 
            setLoader(false)
        })
    }, [])

    const getCurrentVariableInfo = (id) => {        
        let currentVariableInfo = variablesList.find(item => item.ID === Number(id));
        return currentVariableInfo
        
    }

    return(
        <>
        {loader ? <Loader /> : null}
        { errorMessage ? <p className={style.errorMessage} >{errorMessage} 
            <span onClick={() => {setErrorMessage('')}} >✖</span></p> : null }
        <Routes>
            <Route path="/" element={<Variables variablesList={variablesList} />} />
            <Route path="/:variablesId" element={<VariablesInfo getCurrentVariableInfo={getCurrentVariableInfo} variablesList={variablesList} />} />
        </Routes>
        </>
        
    )
}