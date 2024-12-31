import React, { useState } from 'react';
import '../styles/passwd-check.css';

import {
  togglePasswordVisibility,
  calculateStrength,
  getPasswordStrengthLabel,
  calculateTimeToCrack
} from '../scripts/password-check'; // Assuming this is the file where the script is saved.

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('');
  const [timeToCrack, setTimeToCrack] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Calculate password strength
    const strengthValue = calculateStrength(newPassword);
    setStrength(strengthValue);

    // Get the strength label
    const label = getPasswordStrengthLabel(strengthValue);
    setStrengthLabel(label);

    // Calculate time to crack
    const crackTime = calculateTimeToCrack(newPassword, strengthValue);
    setTimeToCrack(crackTime);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="password-checker-container">
      <h1>Password Strength Tester</h1>
      <div className="password-container">
        <label htmlFor="password">Enter Password:</label>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Type your password..."
        />
        <button
          type="button"
          id="togglePassword"
          onClick={handleTogglePasswordVisibility}
        >
          {isPasswordVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      <div className="strength-meter">
        <div className="strength-text">
          Strength: {strengthLabel} ({strength}%)
        </div>
        <div className="meter">
          <div
            className="meter-fill-grey"
            style={{ width: `${strength}%`, backgroundColor: getStrengthColor(strength) }}
          ></div>
        </div>
        <div className="time-to-crack">
          Approx. Time to crack: {timeToCrack}
        </div>
      </div>
    </div>
  );
};

// Optional function to set the color based on strength
const getStrengthColor = (strength) => {
  if (strength < 25) return 'red';
  if (strength < 50) return 'orange';
  if (strength < 75) return 'yellow';
  return 'green';
};

export default PasswordChecker;
