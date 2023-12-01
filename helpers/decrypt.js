// Decryption function
function decryptString(encryptedString) {
  let decrypted = "";
  for (let i = 0; i < encryptedString.length; i++) {
    let charCode = encryptedString.charCodeAt(i);
    charCode = (charCode - 1 + 256) % 256; // Reverse the shift (mod 256)
    decrypted += String.fromCharCode(charCode); // Convert back to character
  }
  return decrypted;
}
module.exports.decryptString = decryptString;