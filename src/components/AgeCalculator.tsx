import "./AgeCalculator.scss"
import arrow from "../assets/icon-arrow.svg"
import { useState } from "react"


interface elapsedTypes {
    years:number | undefined,
    months:number | undefined,
    days:number | undefined,
}

const AgeCalculator = () => {

    const [elapsed, setElapsed] = useState<elapsedTypes>({
        years: undefined,
        months: undefined,
        days: undefined,
    })
    
    const [displayDate, setDisplayDate] = useState<elapsedTypes>({
        years: undefined,
        months: undefined,
        days: undefined,
    });

    const [error, setError] = useState("")
    // const [disable, setDisable ] = useState<boolean>(false);

    
    const currentYear = new Date().getFullYear();

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setElapsed((prevState:any) => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const {days, months, years} = Object.fromEntries(formData);
        
        console.log(Object.fromEntries(formData))

        const inputDate:any = new Date(`${years}-${months}-${days}`);
        const currentDate:any = new Date();
        const timeDiff = currentDate - inputDate;

        const elapsedYears = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
        const elapsedMonth = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
        const elapsedDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
       
        let valid = validateInput();

        if(valid) {
            setDisplayDate({
                years: elapsedYears,
                months: elapsedMonth,
                days: elapsedDays
            });
        }
        // setError("");
    }

    const validateInput = () => {
        let valid = false;
        if(elapsed.days === undefined  || elapsed.months === undefined || elapsed.years === undefined) {
            setError("This field is reqiuired");
            valid = false;
        } else {
            setError("");
            valid = true;
        }

        return valid;
    }

    // const resetDates = () => {
    //     setElapsed({
    //         years: "",
    //         months: "",
    //         days: ""
    //     });
    // };

  return (
    <div className="calculator-container">
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className={`input-block ${elapsed.days! < 0 ? "error" : "error"}`}>
                    <label htmlFor="day" className={`${elapsed.days! > 31 && "input-label-error"}`}>Day</label>
                    <input type="text" name="days" id="day" min={1} max={31} placeholder="DD"
                        value={elapsed.days} 
                        onChange={handleChange}
                    />
                    {elapsed.days! > 31 && <small className="error"> Day must be valid date </small> }
                    {/* <small>{elapsed.days === undefined ? error : ""}</small> */}
                    <small className={`${elapsed.days! > 31 ? "error-new-line" : "error"}`}>{error}</small>
                    
                </div>

                <div className="input-block">
                    <label htmlFor="month" className={`${elapsed.months! > 12 && "input-label-error"}`}>Month</label>
                    <input type="text" name="months" id="month" placeholder="MM"
                        value={elapsed.months} 
                        onChange={handleChange}
                    />
                    {elapsed.months! > 12 &&  <small className="error"> Month must be valid date </small>}
                    <small className={`${elapsed.months! > 12 ? "error-new-line" : "error"}`}>{error}</small>

                </div>

                <div className="input-block">
                    <label htmlFor="year" className={`${elapsed.years! > currentYear && "input-label-error"}`}>Year</label>
                    <input type="text" name="years" id="year" placeholder="YYYY"
                        min={1900} max={currentYear}
                        value={elapsed.years} 
                        onChange={handleChange}
                        
                    />
                    {elapsed.years! > currentYear && <small className="error"> Year must be in the past </small>}
                    <small className={`${elapsed.years! > currentYear ? "error-new-line" : "error"}`}>{error}</small>

                </div>


                <div className="line-separator"> 
                    <button className="btn">
                        <img src={arrow} alt="arrow-down" /> 
                    </button>
                </div>

            </form>
        </div>



        <div className="result-container">
            <div>
                <span className="age-result">{displayDate.years ? displayDate.years : "- -"} </span> 
                <span className="date-text">Years</span>
            </div>

            <div>
                <span className="age-result">{displayDate.months ? displayDate.months : "- -"} </span> 
                <span className="date-text">Months</span>
            </div>
            <div>
                <span className="age-result">{displayDate.days ? (displayDate.days)?.toLocaleString() : "- -"} </span> 
                <span className="date-text">Days</span>
            </div>
        </div>
    </div>
  )
}

export default AgeCalculator