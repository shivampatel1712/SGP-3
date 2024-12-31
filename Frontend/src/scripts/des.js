// Define DES class
class DES {
    constructor(key) {
    // Initialize DES with key
    this.key = CryptoJS.enc.Hex.parse(key);
    }

    encrypt(plaintext) {
    // Perform DES encryption on plaintext
    const encrypted = CryptoJS.DES.encrypt(
        plaintext,
        this.key,
        { mode: CryptoJS.mode.ECB }
    );

    // Return ciphertext as hex string
    return encrypted.ciphertext.toString();
    }

    decrypt(ciphertext) {
    // Parse ciphertext from hex string
    const ciphertextHex = CryptoJS.enc.Hex.parse(ciphertext);

    // Perform DES decryption on ciphertext
    const decrypted = CryptoJS.DES.decrypt(
        { ciphertext: ciphertextHex },
        this.key,
        { mode: CryptoJS.mode.ECB }
    );

    // Return decrypted plaintext as UTF-8 string
    return decrypted.toString(CryptoJS.enc.Utf8);
    }
}

function performOperationEncryption() {
    // Get the input text
    const inputText = document.getElementById("inputTextEncrypt").value;
    const inputKeyText = document.getElementById("inputKeyEncrypt").value || 1234;

    if(inputText === undefined || inputText == ""){
        console.log("No input");
        return ;
    }

    const key = inputKeyText;
    const plaintext = inputText;
    console.log("Plaintext: ", plaintext);
    console.log("Key: ", key);

    // Perform DES encryption
    const des = new DES(key);
    const ciphertext = des.encrypt(plaintext);

    // Print results
    console.log("Ciphertext: ", ciphertext);

    const outputBoxEncrypted = ciphertext;
    
    // Display the result in the output box
    document.getElementById("outputBoxEncrypted").textContent = outputBoxEncrypted;
}

function performOperationDecryption() {
    // Get the input text
    const inputText = document.getElementById("inputTextDecrypt").value;
    const inputKeyText = document.getElementById("inputKeyDecrypt").value || 1234;

    if(inputText === undefined || inputText == ""){
        console.log("No input");
        return ;
    }

    const key = inputKeyText;
    const ciphertext = inputText;
    console.log("Encrypted Text: ", ciphertext);
    console.log("Key: ", key);

    const des = new DES(key);
    // Perform DES decryption
    const decrypted = des.decrypt(ciphertext);

    // Print results
    console.log("Decrypted: ", decrypted);

    const outputBoxDecrypted = decrypted;
    if(decrypted == ""){
        alert("Wrong Secret Key");
    }
    // Display the result in the output box
    document.getElementById("outputBoxDecrypted").textContent = outputBoxDecrypted;
}

