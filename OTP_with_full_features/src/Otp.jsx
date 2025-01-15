import { useState, useRef, useEffect } from "react";

export default function Otp() {
  // State to store the OTP values as an array of 4 empty strings
  const [otp, setOtp] = useState(Array(4).fill(""));

  // Reference to store the input elements
  const inputRef = useRef([]);

  // Effect to focus on the first input field when the component mounts
  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Ignore non-numeric values
    if (isNaN(value)) {
      return;
    }

    // Update the OTP state with the entered digit
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Allow only the last entered digit
    setOtp(newOtp);

    // Automatically move focus to the next input field
    if (value && index < otp.length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
      inputRef.current[index + 1].select(); // Select the text in the next input
    }
  };

  // Handle paste event to allow pasting multiple digits
  const handlePaste = (e) => {
    e.preventDefault(); // Prevent default paste behavior

    // Get the pasted data
    const pastedData = e.clipboardData.getData("text").trim();

    // Ignore non-numeric data
    if (isNaN(pastedData)) {
      return;
    }

    // Split the pasted data into digits and limit it to the length of the OTP
    const pastedDigits = pastedData.split("").slice(0, otp.length);
    const updatedOtp = [...otp];

    // Fill the OTP state with the pasted digits
    pastedDigits.forEach((digit, idx) => {
      const inputIndex = otp.findIndex((val, i) => val === "" && i >= idx);
      if (inputIndex !== -1) {
        updatedOtp[inputIndex] = digit;
      }
    });

    setOtp(updatedOtp);

    // Focus the next empty input or the last input if all fields are filled
    const nextEmptyIndex = updatedOtp.findIndex((val) => val === "");
    if (nextEmptyIndex !== -1 && inputRef.current[nextEmptyIndex]) {
      inputRef.current[nextEmptyIndex].focus();
      inputRef.current[nextEmptyIndex].select();
    } else if (pastedDigits.length === otp.length) {
      inputRef.current[otp.length - 1].focus();
      inputRef.current[otp.length - 1].select();
    }
  };

  // Handle keydown events for arrow navigation and backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowLeft" && index > 0) {
      // Move focus to the previous input and select its text
      e.preventDefault();
      inputRef.current[index - 1].focus();
      inputRef.current[index - 1].select();
    }

    if (e.key === "ArrowRight" && index < otp.length - 1) {
      // Move focus to the next input and select its text
      e.preventDefault();
      inputRef.current[index + 1].focus();
      inputRef.current[index + 1].select();
    }

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous input and select its text if deleting an empty field
      inputRef.current[index - 1].focus();
      inputRef.current[index - 1].select();
    }
  };

  return (
    <>
      <div className="flex justify-center">
        {otp.map((value, idx) => (
          <input
            key={idx} // Unique key for each input
            type="text" // Input type
            className="border border-black w-12 p-4 mx-4 rounded text-center" // Styling
            value={value} // Input value from the state
            onChange={(e) => handleChange(e, idx)} // Change handler
            ref={(currentInput) => (inputRef.current[idx] = currentInput)} // Store the input reference
            onPaste={handlePaste} // Handle paste events
            onKeyDown={(e) => handleKeyDown(e, idx)} // Handle keydown events
            onFocus={() => inputRef.current[idx]?.select()} // Select text when focused manually
          />
        ))}
      </div>
      <h1 className="text-2xl font-mono font-bold text-center mt-8">{otp}</h1>
    </>
  );
}
