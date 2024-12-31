// src/Pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import imageEnc from '../assets/image-enc.png';
import textEnc from '../assets/pngtree-icon-depicting-the-gradient-vector-of-an-encryption-key-for-a-darkthemed-interface-vector-png-image_43631982.jpg';
import passwordCheck from '../assets/image-encryption.jpeg';
import imageSteg from '../assets/image-steganography.png';
import '../styles/Tools.css';

const Home = () => {
  return (
    <div>
      <div className="container-tools">
        <div className="row-tools">
          <div className="js-tools-slider">
            {/* 1st tool */}
            <div className="tools_item violet">
                <Link to="/image-enc">
                <div className="tool-images">
                  <img src={imageEnc} alt="tool-image" className="tool-image" />
                  <hr />
                </div>
                <div className="tool-footer footer-text">Image Encryption</div>
              </Link>            
            </div>

            {/* 2nd tool */}
            <div className="tools_item orange">
              <Link to="/text-enc">
                <div className="tool-images">
                  <img src={textEnc} alt="tool-image" className="tool-image" />
                  <hr />
                </div>
                <div className="tool-footer footer-text">Text Encryption</div>
              </Link>
            </div>

            {/* 3rd tool */}
            <div className="tools_item red">
              <Link to="/pass-check">
                <div className="tool-images">
                  <img src={passwordCheck} alt="tool-image" className="tool-image" />
                  <hr />
                </div>
                <div className="tool-footer footer-text">Password Checker</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="container-tools">
          <div className="row-tools">
            <div className="js-tools-slider">
              {/* 4th tool */}
              <div className="tools_item blue">
                <Link to="/image-steg">
                  <div className="tool-images">
                    <img src={imageSteg} alt="tool-image" className="tool-image" />
                    <hr />
                  </div>
                  <div className="tool-footer footer-text">Image Steganography</div>
                </Link>
              </div>

            {/*5th tool  */}
              <div className="tools_item violet">
                <Link to="/Web-scan">
                <div className="tool-images">
                  <img src={imageEnc} alt="tool-image" className="tool-image" />
                  <hr />
                </div>
                <div className="tool-footer footer-text">Web Vulnerability Scanner</div>
              </Link>            
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
