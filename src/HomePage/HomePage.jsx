import style from "./HomePage.module.css"
import ListOfResult from "./ListOfResult/ListOfResult"


export default function HomePage({ register,
    handleSubmit,
    errors,
    onSubmit,
    resultOfDecode,
    recentlyVins,
    searchVin,
}) {
    return (
        <>
            <div className={`container ${style.recentListWrapper}`} >
                <p style={{marginRight: "15px"}} >Recently Found VIN's:</p>
                {recentlyVins ? <div className={`container ${style.recentList}`} >
                    {recentlyVins.map((item, index) => <div
                        style={{ cursor: 'pointer' }}
                        key={index}
                        onClick={() => onSubmit({ vinCode: item.code })}
                    >{item.code}</div>)}
                </div> : null}
            </div>
            <div className={`container`} style={{width: '80%', marginTop: '1rem'}} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className={`${style.formInput} ${errors.vinCode ? style.errorInput : ''}`} type="text"
                        {...register('vinCode', {
                            required: "Field can't be empty!",
                            maxLength: {
                                value: 17,
                                message: "Max length of filed 17"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: 'The field contains prohibited characters'
                            }
                        })} />
                    <button className={style.submitButton} type="submit" >Submit</button>
                </form>
            </div>

            {searchVin ? <div className={style.searchVin} >
                <h3>
                    {searchVin.vinCode}
                </h3>
            </div> : null}
            {resultOfDecode ? <ListOfResult list={resultOfDecode} /> : null}

        </>

    )
}