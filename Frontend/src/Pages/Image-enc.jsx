import React, { useState, useRef } from "react";
// import './styles/forall.css';
// import './styles/navbar.css';
import "../styles/Image-enc.css";
import CryptoJS from "crypto-js";
import {
  showFileName,
  encryptImage,
  decryptImage,
} from "../scripts/image-encryption.js";

const ImageEncryption = () => {
  const [fileName, setFileName] = useState("");
  const [fileName1, setFileName1] = useState("");
  const [decryptedImageSrc, setDecryptedImageSrc] = useState("");
  const [showDownloadEncryptedBtn, setShowDownloadEncryptedBtn] =
    useState(false);
  const [showDownloadDecryptedBtn, setShowDownloadDecryptedBtn] =
    useState(false);
  const [downloadEncryptedLink, setDownloadEncryptedLink] = useState("");
  const [downloadDecryptedLink, setDownloadDecryptedLink] = useState("");

  const imageInputRef = useRef(null);
  const encryptedImageInputRef = useRef(null);
  const encryptionKeyRef = useRef(null);
  const decryptionKeyRef = useRef(null);

  // Handle file selection for encryption
  const handleImageInputChange = (e) => {
    showFileName(e.target, setFileName);
  };

  // Handle file selection for decryption
  const handleEncryptedImageInputChange = (e) => {
    showFileName(e.target, setFileName1);
  };

  // Encrypt Image
  const handleEncryptImage = () => {
    encryptImage(
      imageInputRef.current,
      encryptionKeyRef.current.value,
      setDownloadEncryptedLink,
      setShowDownloadEncryptedBtn
    );
  };

  // Decrypt Image
  const handleDecryptImage = () => {
    decryptImage(
      encryptedImageInputRef.current,
      decryptionKeyRef.current.value,
      setDecryptedImageSrc,
      setDownloadDecryptedLink,
      setShowDownloadDecryptedBtn
    );
  };

  return (
    <div className="main-area">
      {/* Replace with your Navbar component */}
      {/* <Navbar /> */}

      <div className="container">
        <div className="center-text">
          <h1 className="tool_title">Image Encryption - Decryption</h1>
          <p className="desc_tool">
            Protecting Your Photos: Secure Encryption for Images
          </p>
        </div>

        {/* Encryption Section */}
        <div className="upload-container-one">
          <div className="upload-container">
            <div className="uploader-inner">
              <div className="file-upload-div">
                <input
                  style={{ display: "none" }}
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleImageInputChange}
                />
                <button
                  title="Upload from PC"
                  onClick={() => imageInputRef.current.click()}
                >
                  Upload from PC
                </button>
              </div>
            </div>
          </div>
          <span className="file-name">Selected File: {fileName}</span>
          <div className="input-msg">
            <label htmlFor="encryptionKey">
              <p id="bold">The Encryption Key</p>
            </label>
            <textarea
              placeholder="Enter Encryption Key"
              rows="2"
              cols="50"
              maxLength="1000"
              id="encryptionKey"
              className="form-control"
              ref={encryptionKeyRef}
            ></textarea>
          </div>
          <div className="encrypt-btn">
            <button title="Encrypt" onClick={handleEncryptImage}>
              Encrypt
            </button>
          </div>
          {showDownloadEncryptedBtn && (
            <div className="download-btn" id="download-btn">
              <button>
                <a href={downloadEncryptedLink} download="encrypted_image.png">
                  Download Encrypted Image
                </a>
              </button>
            </div>
          )}
        </div>

        <hr />

        {/* Decryption Section */}
        <div className="upload-container-one">
          <div className="upload-container">
            <div className="uploader-inner">
              <div className="file-upload-div">
                <input
                  style={{ display: "none" }}
                  id="encryptedImageInput"
                  type="file"
                  accept="image/*"
                  ref={encryptedImageInputRef}
                  onChange={handleEncryptedImageInputChange}
                />
                <button
                  title="Upload from PC"
                  onClick={() => encryptedImageInputRef.current.click()}
                >
                  Upload from PC
                </button>
              </div>
            </div>
          </div>
          <span className="file-name1">Selected File: {fileName1}</span>
          <div className="input-msg">
            <label htmlFor="decryptionKey">
              <p id="bold">The Decryption Key</p>
            </label>
            <textarea
              placeholder="Enter Decryption Key"
              rows="2"
              cols="50"
              maxLength="1000"
              id="decryptionKey"
              className="form-control"
              ref={decryptionKeyRef}
            ></textarea>
          </div>
          <div className="encrypt-btn">
            <button title="Decrypt" onClick={handleDecryptImage}>
              Decrypt
            </button>
          </div>
          <div>
            {showDownloadDecryptedBtn && (
              <div className="download-btn" id="download-btn">
                <button>
                  <a
                    href={downloadDecryptedLink}
                    download="decrypted_image.png"
                  >
                    Download Decrypted Image
                  </a>
                </button>
              </div>
            )}

            {/* display image using this  */}
            {decryptedImageSrc && (
              <div className="uploader-container">
                <div className="image-container">
              <div className="decryptedImageDisplay" id="decryptedImageDisplay">
              <p className="source-img">Decrypted Image :</p>
                <img
                  src={decryptedImageSrc}
                  alt="Decrypted"
                  id="decryptedImage"
                />
              </div>
            </div>
          </div>
              
            )}

            {showDownloadDecryptedBtn && (
              <div className="download-btn" id="download-btn">
                <button>
                  <a
                    href={downloadDecryptedLink}
                    download="decrypted_image.png"
                  >
                    Download Decrypted Image
                  </a>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEncryption;
