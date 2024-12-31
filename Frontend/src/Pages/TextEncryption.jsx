import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import '../styles/des.css'; 

function TextEncryption() {
  const [textToEncrypt, setTextToEncrypt] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('1234'); // Default key
  const [encryptedText, setEncryptedText] = useState('');
  
  const [textToDecrypt, setTextToDecrypt] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('1234'); // Default key
  const [decryptedText, setDecryptedText] = useState('');

  // Perform encryption
  const performEncryption = () => {
    if (textToEncrypt && encryptionKey) {
      const encrypted = CryptoJS.DES.encrypt(textToEncrypt, encryptionKey).toString();
      setEncryptedText(encrypted);
    } else {
      alert('Please provide text and a key for encryption.');
    }
  };

  // Perform decryption
  const performDecryption = () => {
    if (textToDecrypt && decryptionKey) {
      try {
        const bytes = CryptoJS.DES.decrypt(textToDecrypt, decryptionKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (decrypted) {
          setDecryptedText(decrypted);
        } else {
          setDecryptedText('Invalid decryption key or corrupted data.');
        }
      } catch (error) {
        setDecryptedText('Error: Unable to decrypt. Please check your input.');
      }
    } else {
      alert('Please provide text and a key for decryption.');
    }
  };

  return (
    <div className="main-area">
      <div className="container">
        <div className="center-text">
          <h1 className="tool_title">Text Encryption - Decryption</h1>
          <p className="desc_tool">Unlocking Privacy: Your Text, Secured with DES Encryption</p>
        </div>
        <div className="summarizer">
          <div className="row">
            <div className="col-12">
              <div className="summarizer-item">
                <label htmlFor="inputTextEncrypt" className="enter-any-text">Enter any text to be encrypted</label>
                <div className="form-group">
                  <textarea
                    placeholder="i.e., the importance of the honey bee"
                    rows="9"
                    cols="100"
                    maxLength="1000"
                    id="inputTextEncrypt"
                    className="form-control"
                    value={textToEncrypt}
                    onChange={(e) => setTextToEncrypt(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputKeyEncrypt">
                    <p id="bold">Enter Secret Key</p> 
                    (Remember, the encrypted text can't be decrypted without this secret key)
                  </label>
                  <textarea
                    placeholder="Enter Secret Key (Default = 1234)"
                    rows="1"
                    cols="100"
                    maxLength="64"
                    id="inputKeyEncrypt"
                    className="form-control"
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                  />
                </div>
                <div className="summarizer-action">
                  <button className="button" onClick={performEncryption}>Generate</button>
                </div>
                <label htmlFor="outputBoxEncrypted" className="enter-any-text">Encrypted Output</label>
                <div className="form-group">
                  <textarea
                    placeholder="Result goes here"
                    rows=""
                    cols="100"
                    id="outputBoxEncrypted"
                    className="form-control"
                    readOnly
                    value={encryptedText}
                  />
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="summarizer-item">
                <label htmlFor="inputTextDecrypt" className="enter-any-text">Enter any text to be Decrypted</label>
                <div className="form-group">
                  <textarea
                    placeholder="724d6f26690fee4e1a0ef68afa6c51fb"
                    rows="9"
                    cols="100"
                    maxLength="1000"
                    id="inputTextDecrypt"
                    className="form-control"
                    value={textToDecrypt}
                    onChange={(e) => setTextToDecrypt(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputKeyDecrypt">
                    <p id="bold">Enter Secret Key</p> 
                    (The same key used during encryption)
                  </label>
                  <textarea
                    placeholder="Enter Secret Key (Default = 1234)"
                    rows="1"
                    cols="100"
                    maxLength="64"
                    id="inputKeyDecrypt"
                    className="form-control"
                    value={decryptionKey}
                    onChange={(e) => setDecryptionKey(e.target.value)}
                  />
                </div>
                <div className="summarizer-action">
                  <button className="button" onClick={performDecryption}>Generate</button>
                </div>
                <label htmlFor="outputBoxDecrypted" className="enter-any-text">Decrypted Output</label>
                <div className="form-group">
                  <textarea
                    placeholder="Result goes here"
                    rows=""
                    cols="100"
                    id="outputBoxDecrypted"
                    className="form-control"
                    readOnly
                    value={decryptedText}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextEncryption;
