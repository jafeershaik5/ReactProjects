import React, { useEffect, useRef, useState } from "react";

function Otp({ otpCount }) {
    const [otpFields, setOtpFields] = useState(new Array(otpCount).fill(""));
    const ref = useRef([]);
    const keyDownHandle = (e, index) => {
        const key = e.key;
        const copyOtpFields = [...otpFields];

        // if key is left arrow then shift the focus to left 
        //if the index is zero that means the focus in the first box we dont do anything 
        //to shift the focus to left the currrent focus should not be at first position it should be greater than 0 that means from second box
        if (key === "ArrowLeft") {
            if (index > 0) ref.current[index - 1].focus();
            return;
        }
        //If the key is right arrow then shift the focus to right.
        //If the focus is on the last box we we dont go further because there are no boxes there. 
        if (key === 'ArrowRight') {
            if (index + 1 < otpFields.length) ref.current[index + 1].focus()
            return
        }
        //If key is backspace f
        //1. we clear the current box 
        //2. set otpfield with the value
        //3. set the focus to the previous box till it is first box
        if (key === 'Backspace') {
            copyOtpFields[index] = '';
            setOtpFields(copyOtpFields);
            if (index > 0) ref.current[index - 1].focus()
            return
        }
        if (isNaN(key)) { //If key is not a number then return we dont do anything 
            return;
        }
        //if there is any value in the box then we dont put value 
        // if we need to put the value in the box first we have to delete it.
        // if the box is empty then we can put the value
        if (!copyOtpFields[index]) {
            copyOtpFields[index] = key;
        }
        //if the box is with value then we focus the next box until we reached end
        if (index + 1 < otpFields.length) {

            ref.current[index + 1].focus();
        }
        setOtpFields(copyOtpFields); //this is where we set values to the otp Fields
    };

    useEffect(() => {
        ref.current[0].focus()
    }, [])  // we focus the first box on the component mount
    return (
        <>
            {otpFields.map((value, index) => {
                return (
                    <input
                        key={index}
                        ref={(currentInput) => (ref.current[index] = currentInput)}
                        type="text"
                        value={value}
                        onKeyDown={(e) => keyDownHandle(e, index)}
                        readOnly
                    />
                );
            })}
        </>
    );
}
export default Otp;
