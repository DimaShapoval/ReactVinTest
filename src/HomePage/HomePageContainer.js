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
    const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : ''

    useEffect(() => {
        if (errors.vinCode) {
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
        setRecentlyVins((await axios.get(`${baseUrl}/api/recentlyVins`)).data)
    }

    function sendRecentlyVins(vinCode) {
        axios.post(`${baseUrl}/api/recentlyVins`, vinCode)
        .then(res => {
            setLoader(true)
            setRecentlyVins(res.data)
        })
        .catch(error => {
            setErrorMessage(error.message)
        })
        .finally(() => {
            setLoader(false)
        })
    }

    const vinCodeFromSubmit = (data) => {        
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${data.vinCode.toUpperCase()}?format=json`)
            .then(res => {
                setLoader(true)
                let result = res.data
                setErrorMessage('')
                let incorrectVin = result.Results.some(item => item.Value && item.Value.includes('Incomplete VIN'));
                if (incorrectVin) {
                    setErrorMessage('Incorrect VIN');
                    return;
                }
                result = result.Results.filter(item => item.Value);
                setResultOfDecode(result);
                sendRecentlyVins({code: data.vinCode});
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
            { errorMessage ? <p className={style.errorMessage} >{errorMessage}</p> : null }
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