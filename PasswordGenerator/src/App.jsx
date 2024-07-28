import { useState, useEffect, useRef } from "react";
import "./App.css";
import { useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false)
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (charAllowed) str += '!@#$%^&*_'
    if (numAllowed) str += '0123456789'
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, charAllowed, numAllowed, setPassword])

  useEffect(() => {
    generatePassword()
  }, [length, numAllowed, charAllowed])

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select()
    setCopied(prev => !prev)
    setTimeout(() => {
      setCopied(prev => !prev)
    }, 1500)
  }

  const regeneratePass = () => {
    generatePassword()
  }
  return (
    <>
      <div className="container">
        <div className="password">
          <input type="text" value={password} readOnly ref={passwordRef} />
          <button className="copy-button" onClick={copyToClipboard}>{copied ? 'Copied' : 'Copy'}</button>
          <button onClick={regeneratePass}>Regenerate</button>
        </div>
        <div className="password2">
          <input
            id="range"
            type="range"
            name="length"
            min={6}
            max={15}
            value={length}
            placeholder="length"
            onClick={regeneratePass}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="range">Length:{length}</label>
          <input
            id="Numbers"
            type="checkbox"
            defaultChecked={numAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          <label htmlFor="Numbers">Numbers</label>
          <input
            type="checkbox"
            id="character"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="character">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
