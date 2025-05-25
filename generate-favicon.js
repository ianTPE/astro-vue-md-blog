const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Base64-encoded minimal favicon (a simple blue square)
const faviconBase64 = 'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAMMOAADDDgAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANuoUADbqFAA26hQMNuoULzbqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFDv26hQYNuoUADbqFAA////AP///wDbqFAA26hQANuoUJDbqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFC/26hQENuoUAD///8A////ANuoUADbqFBw26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFCg26hQAP///wD///8A26hQQNuoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUODbqFAQ////AP///wDbqFDL26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUGD///8A26hQINuoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQkP///wDbqFCA26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFDP////ANuoUJDbqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUOD///8A26hQYNuoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQsP///wDbqFAQ26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFBw////AP///wDbqFDL26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQwNuoUBD///8A////ANuoUGDbqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUJDbqFAA////AP///wD///8A26hQENuoUKDbqFD/26hQ/9uoUP/bqFD/26hQ/9uoUP/bqFD/26hQ/9uoUL/bqFAw26hQANuoUAD///8A////AP///wD///8A26hQANuoUDDbqFCw26hQ79uoUP/bqFD/26hQ79uoULDbqFBQ26hQENuoUADbqFAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///8A';

// Convert base64 to buffer
const faviconBuffer = Buffer.from(faviconBase64, 'base64');

// Write to file
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconBuffer);

console.log('Favicon created successfully!');
