import React, { useEffect }  from 'react';
import '../styles/home.css';

const Home = () => {
  // Smooth scroll function
  const handleLearnMoreClick = () => {
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Scroll on mount if there's a hash
    handleHashChange();

    // Add an event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [])

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to CyberSecure</h1>
          <p className="hero-subtitle">
            Your trusted partner in cybersecurity solutions, encryption tools, and more.
          </p>
          <button className="hero-btn" onClick={handleLearnMoreClick}>
            Learn More
          </button>
        </div>
      </header>

      <section className="about-section" id="about">
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            CyberSecure is dedicated to providing advanced tools to protect your data and privacy. 
            Our cutting-edge image encryption ensures that your sensitive information remains secure. 
            Explore our tools designed to help you safeguard against cyber threats.
          </p>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="features-content">
          <h2>Our Features</h2>
          <div className="feature-box">
            <h3>Image Encryption</h3>
            <p>
              Encrypt your images with our advanced encryption tool to ensure no unauthorized access.
            </p>
          </div>
          <div className="feature-box">
            <h3>Text Encryption</h3>
            <p>
              Safeguard your text data with our efficient text encryption tool, ensuring privacy and security.
            </p>
          </div>
          <div className="feature-box">
            <h3>Password Checker</h3>
            <p>
              Check the strength of your passwords and enhance your security with our user-friendly password checker.
            </p>
          </div>
          <div className="feature-box">
            <h3>Image Steganography</h3>
            <p>
              Hide your data within images using our advanced image steganography tool for discreet information sharing.
            </p>
          </div>
          <div className="feature-box">
            <h3>Web Vulnerability Scanner</h3>
            <p>
              Scan your web applications for vulnerabilities and strengthen your security posture with our scanner.
            </p>
          </div>
        </div>
      </section>
      
      <section className="testimonial-section">
        <div className="testimonial-content">
          <h2>What Our Users Say</h2>
          <blockquote>
            <p>"CyberSecure has transformed the way I protect my images. I feel confident knowing my data is safe!"</p>
            <footer>- Hival Patel</footer>
          </blockquote>
          <blockquote>
            <p>"The tools are intuitive and easy to use. Highly recommend!"</p>
            <footer>- Shivam Patel</footer>
          </blockquote>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 CyberSecure. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
