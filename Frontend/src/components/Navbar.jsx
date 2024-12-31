import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const copyLink = () => {
    navigator.clipboard.writeText('https://www.cybersec.com');
    alert('Link copied!');
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-div">
          <Link to="/">
          <div className="logo-img">
              <img src="/src/assets/CyberSec.png" alt="cybersec" className="cybersec-png" />
          </div>
          </Link>
          <div className="ul-div">
            <ul className="navbar-list">
              <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
              <li className="nav-item"><Link to="/tools" className="nav-link">Tools</Link></li>
              <li className="nav-item"><Link to="/#about" className="nav-link">About Us</Link></li>
            </ul>
          </div>
          <div className="share-div" onClick={toggleModal}>

            {/* <img src="/src/assets/share.png" alt="share" className="share-png" /> */}
          </div>

          {/* Modal */}
          {modalVisible && (
            <div id="myModal" className="modal">
              <div className="modal-content">
                <span className="close" onClick={toggleModal}>&times;</span>
                <div className="modal-inner-content">
                  <div className="m-title">Show Us Some Love</div>
                  <div className="m-desc">Tell the world about CyberSec</div>
                  <div className="icons">
                    <a href="https://twitter.com/intent/tweet?text=Securing Digital Footprints: Unveil, Encrypt, Fortify.&url=https://cybersec.com"
                      target="_blank" title="Share to Twitter" rel="noreferrer noopener">
                      <div className="x-icon">
                        {/* Updated image path */}
                        <img src="/src/assets/x-social-media-white-icon.png" alt="Twitter" className="x-icon-img" />
                      </div>
                    </a>
                  </div>
                  <div className="input-group">
                    <input type="text" className="form-control default-background" value="https://www.cybersec.com" readOnly />
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" onClick={copyLink}>Copy Link</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} 
        </div>
      </div>
      {modalVisible && <div id="overlay" onClick={toggleModal}></div>}
    </nav>
  );
};

export default Navbar;
