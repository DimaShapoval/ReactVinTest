import { useForm } from "react-hook-form";
import HomePage from "./HomePage";
import style from "./HomePage.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

export default function HomePageContainer() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [resultOfDecode, setResultOfDecode] = useState(null);
    const [recentlyVins, setRecentlyVins] = useState([]);
    const [searchVin, setSearchVin] = useState('');
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (errors.vinCode) { // check from errors
            setErrorMessage(errors.vinCode.message)
        }
        else {
            setErrorMessage('')
        }
    }, [errors.vinCode]);

    useEffect(() => {
        getData()
    }, []);

    async function getData() {        
        setRecentlyVins(JSON.parse(localStorage?.recentlyVins));
    }

    function sendRecentlyVins(vinCode) { // set new data of recently vin codes that was searched
        let newData = recentlyVins ? recentlyVins : [];
        let dublicate = newData.some(item => item.code === vinCode.code);
        if (!dublicate) {
            if (newData.length >= 3) {
                newData.pop();
            }
            newData.unshift(vinCode);

        }
        setRecentlyVins(newData);
        localStorage.setItem('recentlyVins', JSON.stringify(recentlyVins))
    }

    const vinCodeFromSubmit = (data) => { // get data of vin code that user input
        setLoader(true)
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${data.vinCode.toUpperCase()}?format=json`)
            .then(res => {
                let result = res.data
                setErrorMessage('')
                // checking of correct vin
                let incorrectVin = result.Results.some(item => item.Value && item.Value.includes('Incomplete VIN'));
                if (incorrectVin) {
                    setErrorMessage('Incorrect VIN');
                    return;
                }
                result = result.Results.filter(item => item.Value); // take items with Value
                setResultOfDecode(result);
                sendRecentlyVins({ code: data.vinCode });
                setSearchVin(data);

            })
            .catch(error => {
                setErrorMessage(error.message)
            })
            .finally(() => {
                setLoader(false)
            })

    }


    return (
        <>
            {loader ? <Loader /> : null}
            {errorMessage ? <p className={style.errorMessage} >{errorMessage}</p> : null}
            <HomePage
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={vinCodeFromSubmit}
                resultOfDecode={resultOfDecode}
                recentlyVins={recentlyVins}
                searchVin={searchVin}
            />
        </>

    )
}