import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Tools from './Pages/Tools';
import Home from './Pages/Home';
import WebScan from './Pages/Web-scan';
import TextEncryption from './Pages/TextEncryption';
import ImageSteganography from './Pages/ImageSteganography';
import ImageEncryption from './Pages/Image-enc';
import PasswordStrengthTester from './Pages/Pass-checker';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/image-enc" element={<ImageEncryption />} />
          <Route path="/Web-scan" element={<WebScan />} />
          <Route path="/text-enc" element={<TextEncryption />} />
          <Route path="/image-steg" element={<ImageSteganography />} />
          <Route path="/pass-check" element={<PasswordStrengthTester />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
