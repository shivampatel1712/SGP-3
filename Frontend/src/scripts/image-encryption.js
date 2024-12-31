// image-encryption.js
import CryptoJS from 'crypto-js';

export function showFileName(inputElement, setFileName) {
  const fileName = inputElement.files[0]?.name || '';
  setFileName(fileName);
}

export function encryptImage(
  imageInput,
  encryptionKey,
  setDownloadEncryptedLink,
  setShowDownloadEncryptedBtn
) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const imageData = event.target.result.split(',')[1]; // Get base64 image data

    const encrypted = CryptoJS.AES.encrypt(imageData, encryptionKey).toString();

    const encryptedDataUrl = 'data:image/png;base64,' + encrypted;
    setDownloadEncryptedLink(encryptedDataUrl);
    setShowDownloadEncryptedBtn(true);
  };

  if (imageInput?.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  }
}

export function decryptImage(
  encryptedImageInput,
  decryptionKey,
  setDecryptedImageSrc,
  setDownloadDecryptedLink,
  setShowDownloadDecryptedBtn
) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const encryptedImageData = event.target.result.split(',')[1]; // Get base64 image data
    let decrypted;
    try {
      decrypted = CryptoJS.AES.decrypt(encryptedImageData, decryptionKey).toString(CryptoJS.enc.Utf8);
      if (!decrypted) throw new Error('Decryption failed');
    } catch (error) {
      alert('Decryption failed: Wrong Decryption Key');
      return;
    }

    const decryptedDataUrl = 'data:image/png;base64,' + decrypted;
    setDecryptedImageSrc(decryptedDataUrl);
    setDownloadDecryptedLink(decryptedDataUrl);
    setShowDownloadDecryptedBtn(true);
  };

  if (encryptedImageInput?.files[0]) {
    reader.readAsDataURL(encryptedImageInput.files[0]);
  }
}
