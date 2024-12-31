import React, { useEffect, useRef, useState } from "react";
import "../styles/image-steg.css";

const ImageSteganography = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [encodedImage, setEncodedImage] = useState(null);
  const [secretMessage, setSecretMessage] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [showEncodedImage, setShowEncodedImage] = useState(false);

  const canvasRef = useRef(null);
  const canvasRef1 = useRef(null);

  const hideMessageInImage = (imageData, message) => {
    let imgData = imageData.data;
    let msg = message + "\0";
    let msgLen = msg.length;
    let msgIndex = 0;

    console.log("Hiding message:", msg);

    for (let i = 0; i < imgData.length; i += 8) {
      if (msgIndex < msgLen) {
        let charCode = msg.charCodeAt(msgIndex);
        imgData[i] = (imgData[i] & 0xfe) | ((charCode >> 7) & 0x01);
        imgData[i + 1] = (imgData[i + 1] & 0xfe) | ((charCode >> 6) & 0x01);
        imgData[i + 2] = (imgData[i + 2] & 0xfe) | ((charCode >> 5) & 0x01);
        imgData[i + 3] = (imgData[i + 3] & 0xfe) | ((charCode >> 4) & 0x01);
        imgData[i + 4] = (imgData[i + 4] & 0xfe) | ((charCode >> 3) & 0x01);
        imgData[i + 5] = (imgData[i + 5] & 0xfe) | ((charCode >> 2) & 0x01);
        imgData[i + 6] = (imgData[i + 6] & 0xfe) | ((charCode >> 1) & 0x01);
        imgData[i + 7] = (imgData[i + 7] & 0xfe) | (charCode & 0x01);

        msgIndex++;
      } else {
        break;
      }
    }

    console.log("Message hidden successfully.");
    return imageData;
  };

  const extractMessageFromImage = (imageData) => {
    let imgData = imageData.data;
    let extractedMessage = "";
    let charCode = 0;

    console.log("Starting extraction...");

    for (let i = 0; i < imgData.length; i += 8) {
      charCode =
        ((imgData[i] & 0x01) << 7) |
        ((imgData[i + 1] & 0x01) << 6) |
        ((imgData[i + 2] & 0x01) << 5) |
        ((imgData[i + 3] & 0x01) << 4) |
        ((imgData[i + 4] & 0x01) << 3) |
        ((imgData[i + 5] & 0x01) << 2) |
        ((imgData[i + 6] & 0x01) << 1) |
        (imgData[i + 7] & 0x01);

      if (charCode === 0) {
        break;
      }

      extractedMessage += String.fromCharCode(charCode);
    }

    console.log("Extraction completed:", extractedMessage);
    return extractedMessage;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        setSelectedImage(event.target.result);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const hideText = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageData = hideMessageInImage(imageData, secretMessage);

    ctx.putImageData(imageData, 0, 0);
    setEncodedImage(canvas.toDataURL());
    setShowEncodedImage(true);
  };

  const decodeImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const message = extractMessageFromImage(imageData);
        setDecodedText(message);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="compress-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="center-text">
            <h1 className="tool_title">Image Steganography</h1>
            <p className="desc_tool">
              Secrets in Plain Sight: Safeguarding Images with Steganography
            </p>
          </div>

          <div className="col">
            <div className="uploader-container">
              {selectedImage && (
                <div className="image-container">
                  <p className="source-img">Source Image :</p>
                  <img id="image1" src={selectedImage} alt="Selected" />
                </div>
              )}
              <br />

              <div className="uploader-inner">
                <div className="file-upload-div">
                  <input
                    style={{ display: "none" }}
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <button
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Upload from PC
                  </button>
                </div>
              </div>
            </div>
            <div className="input-msg">
              <label htmlFor="msg" className="label">
                <p id="bold">The Message</p>
              </label>
              <textarea
                placeholder="Enter Secret Message"
                rows="5"
                cols="100"
                maxLength="100"
                value={secretMessage}
                onChange={(e) => setSecretMessage(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="hide-btn">
              <button onClick={hideText}>Hide Message Into Image</button>
            </div>


            {/* stegno image display */}
            {showEncodedImage && (
              <div className="uploader-container">
                <div className="image-container">
                  <p className="source-img">Message Encoded Image :</p>
                  <img id="image2" src={encodedImage} alt="Encoded" />
                  <div className="download-btn" id="download-btn">
                    <button>
                      <a
                        href={encodedImage} // Ensure this is the encoded image source
                        download="steganographed_image.png"
                      >
                        Download Steganographed Image
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <hr />
            <div className="file-upload-div decode-btn">
              <input
                style={{ display: "none" }}
                id="fileInputDecode"
                type="file"
                accept="image/*"
                onChange={decodeImage}
              />
              <button
                style={{ marginBottom: "20px" }}
                onClick={() =>
                  document.getElementById("fileInputDecode").click()
                }
              >
                Upload Image to Decode
              </button>
            </div>
            <div className="decoded-text">
              <label
                htmlFor="title"
                className="decoded-text-title"
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  marginBottom: "20px",
                }}
              >
                Decoded Text:
              </label>
              <div className="form-group">
                <textarea
                  placeholder="Result goes here"
                  rows="5"
                  cols="100"
                  value={decodedText}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <canvas ref={canvasRef1} style={{ display: "none" }} />
    </div>
  );
};

export default ImageSteganography;
