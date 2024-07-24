import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [upperCaseAllowed, setUpperCaseAllowed] = useState(false);
  const [lowerCaseAllowed, setLowerCaseAllowed] = useState(true);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);

  const generatePassword = useCallback(() => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let all = "";
    if (upperCaseAllowed) all += upper;
    if (numberAllowed) all += numbers;
    if (symbolsAllowed) all += symbols;
    if (lowerCaseAllowed) all += lower;
    if (!upperCaseAllowed && !numberAllowed && !symbolsAllowed && !lowerCaseAllowed)
      setPassword(" Make Some Choice");

    else {
      let randomPassword = '';
      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * all.length);
        randomPassword += all[randomIndex];
      }
      setPassword(randomPassword);
    }

  }, [passwordLength, upperCaseAllowed, numberAllowed, symbolsAllowed, lowerCaseAllowed, setPassword]);
  useEffect(() => {
    generatePassword();
  }, [passwordLength, upperCaseAllowed, numberAllowed, symbolsAllowed, lowerCaseAllowed, generatePassword])
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard');
  };

  return (
    <div className="container">
      <div className="password-generator">
        <div class="text-typing">
          <p style={{ textAlign: "center" }}>Welcome to <span><br />Password Generator</span></p>
        </div>
        <div className="password-display-container">
          <div className="password-display">
            <input type="text" style={{ width: "400px" }} value={password} readOnly />
          </div>
          <div className="button-container">
            <button id="generate-btn" onClick={generatePassword}>&#x21bb;</button>
            <button id="copy-btn" onClick={copyToClipboard}>
              COPY PASSWORD<span className="arrow">→</span>
            </button>
          </div>
        </div>
        <div className="slider-container">
          <input
            type="range"
            min="8"
            max="32"
            value={passwordLength}
            id="length-slider"
            style={{ padding: '20px', width: '300px' }}
            onChange={(e) => setPasswordLength(parseInt(e.target.value, 10))}
          />
          <span id="length-value">{passwordLength}</span>
        </div>

        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={upperCaseAllowed}
              onChange={(e) => setUpperCaseAllowed(e.target.checked)}
            /> Uppercase letters
          </label>
          <label>
            <input
              type="checkbox"
              checked={lowerCaseAllowed}
              onChange={(e) => setLowerCaseAllowed(e.target.checked)}
              readOnly
            /> Lowercase letters
          </label>
          <label>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
            /> Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={symbolsAllowed}
              onChange={(e) => setSymbolsAllowed(e.target.checked)}
            /> Symbols
          </label>
        </div>
      </div>

    </div>
  );
}

export default App;
