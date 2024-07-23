import React, { useEffect, useState, useRef } from 'react'

function CountDownTimer() {
    // State to hold the time values
    const [time, setTime] = useState({
        hour: '',
        minute: '',
        second: ''
    })

    // Ref to store the interval ID
    const intervalRef = useRef(null)  //creating a ref for the interval id for reference between re renders.

    // State to track whether the timer is running or not
    const [isRunning, setIsRunning] = useState(false) //Creating a state for to know the timer is runnring is not.

    // Handle change in input fields
    const handleChange = (e, field) => {
        const value = parseInt(e.target.value) || 0; //taking the value from the e.target.value and converting it to integer
        const copyTime = { ...time } //copying the time state
        copyTime[field] = value // updating the specific field (hour/minute/second)
        copyTime.minute += Math.floor(copyTime.second / 60) // adjusting minutes if seconds are more than 60
        copyTime.second = copyTime.second % 60 // setting seconds to the remainder after dividing by 60
        copyTime.hour += Math.floor(copyTime.minute / 60) // adjusting hours if minutes are more than 60
        copyTime.minute = copyTime.minute % 60 // setting minutes to the remainder after dividing by 60
        setTime(copyTime) // updating the time state
    }

    // Handle the start/pause button click
    const handleStart = () => {
        if (time.hour.length === 0 && time.minute.length === 0 && time.second.length === 0) return // if all time fields are empty, do nothing
        setIsRunning(!isRunning) // toggling the isRunning state
    }

    // Handle the reset button click
    const handleReset = () => {
        console.log('reset clicked')
        clearInterval(intervalRef.current) // clearing the interval
        setIsRunning(false) // stopping the timer
        setTime({ hour: '', minute: '', second: '' }) // resetting the time state
    }

    // Effect to handle the timer countdown
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    const copyPrevTime = { ...prevTime } // copying the previous time state
                    copyPrevTime.second--; // decreasing the second by 1
                    if (copyPrevTime.second < 0) {
                        copyPrevTime.minute--; // if seconds are less than 0, decrease the minute by 1
                        copyPrevTime.second = 59 // and set seconds to 59
                        if (copyPrevTime.minute < 0) {
                            copyPrevTime.hour--; // if minutes are less than 0, decrease the hour by 1
                            copyPrevTime.minute = 59; // and set minutes to 59
                            if (copyPrevTime.hour < 0) {
                                clearInterval(intervalRef.current) // if hours are less than 0, stop the timer
                                setIsRunning(false); //and reset the isRunning to change the start button from pause to start
                                return { hour: '', minute: '', second: '' } // and reset the time state
                            }
                        }
                    }
                    return copyPrevTime // returning the updated time state
                })
            }, 1000) // setting the interval to run every 1 second
        }
        return () => {
            clearInterval(intervalRef.current) // clearing the interval when the component unmounts or isRunning changes
        }
    }, [isRunning])

    return (
        <>
            <div className="input-container">
                <input type="text" placeholder='HH' disabled={isRunning} value={time.hour} onChange={(e) => handleChange(e, 'hour')} />:
                <input type="text" placeholder='MM' disabled={isRunning} value={time.minute} onChange={(e) => handleChange(e, 'minute')} />:
                <input type="text" placeholder='SS' disabled={isRunning} value={time.second} onChange={(e) => handleChange(e, 'second')} />
            </div>
            <div className="btn-container">
                <button onClick={handleStart}>{isRunning ? "Pause" : "Start"}</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </>
    )
}

export default CountDownTimer