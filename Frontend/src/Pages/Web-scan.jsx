import React, { useState } from 'react';
import '../styles/Web-scan.css';

function WebScan() {
  const [targetUrl, setTargetUrl] = useState('');
  const [scanSummary, setScanSummary] = useState(null);
  const [error, setError] = useState('');
  const [isConsentChecked, setIsConsentChecked] = useState(false); // Track checkbox state

  const handleScan = async () => {
    if (!targetUrl) {
      setError('Please enter a URL.');
      return;
    }

    if (!isConsentChecked) {
      setError('You must agree to the Terms of Service before proceeding.');
      return;
    }

    // Show alert when the scan starts
    alert('The scan has started. Please wait for the results.');

    setError(''); // Clear any previous errors

    try {
      const response = await fetch(`http://localhost:3000/scan?url=${encodeURIComponent(targetUrl)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('In frontend summary:', data);
      setScanSummary(data.alertsSummary); // Access alertsSummary here
    } catch (error) {
      console.error('Error during scan:', error);
      setError('Failed to scan the target. Please try again.');
    }
  };

  const renderSummary = () => {
    console.log('In renderSummary:', scanSummary);
    if (!scanSummary) return null;

    return (
      <div className="summary">
        <h2>Scan Summary</h2>
        <div>
          <p>Total Alerts : {scanSummary.High + scanSummary.Medium + scanSummary.Low + scanSummary.Informational}</p>
          <p>High Risk : {scanSummary.High || 0}</p>
          <p>Medium Risk : {scanSummary.Medium || 0}</p>
          <p>Low Risk : {scanSummary.Low || 0}</p>
          <p>Informational : {scanSummary.Informational || 0}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="scanner-container">
      <div className="details">
        <h1>Website Vulnerability Scanner</h1>
        <p>
          This tool allows users to perform a general vulnerability scan of any website by simply entering the URL. It analyzes various security aspects of the website, identifying potential risks that may compromise the site's integrity or expose sensitive data.
        </p>
      </div>
      <div className="scan-box">
        <input
          style={{
            background: '#ffffffe6',
            color: '#000000'
          }}
          type="url"
          placeholder="https://www.example.com"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
        />
        <div className="consent">
          <input
            type="checkbox"
            id="consent"
            checked={isConsentChecked}
            onChange={(e) => setIsConsentChecked(e.target.checked)} // Update checkbox state
          />
          <label htmlFor="consent" style={{ color: '#1a2a4a' }}>
            I am authorized to scan this target and I agree with the Terms of Service.
          </label>
        </div>
        <button className="scan-button" onClick={handleScan}>
          Start scan
        </button>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        {renderSummary()}
      </div>
    </div>
  );
}

export default WebScan;
