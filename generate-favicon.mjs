import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Base64-encoded minimal favicon (a blue square with an 'A' for Astro)
const faviconBase64 = 'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKbFYAimxWFIpsVmeKbFamimxW04psVtOKbFalimxWZopsVhOKbFYAAAAAAAAAAAAAAAAAAAAAAAAAAACKbFYAimxWJIpsVrKKbFb/imxW/4psVv+KbFb/imxW/4psVv+KbFb/imxWsYpsViKKbFYAAAAAAAAAAACKbFYAimxWF4psVsWKbFb/imxW/4psVv+KbFb/imxW/4psVv+KbFb/imxW/4psVv+KbFbEimxWFopsVgAAAAAAimxWAIpsVoSKbFb/imxW/4psVv+KbFb/imxW/4psVv+KbFb/imxW/4psVv+KbFb/imxW/4psVoOKbFYAimxWAIpsViaKbFbzimxW/4psVv+KbFb/imxW/4psVv+KbFb/imxW/4psVv+KbFb/imxW/4psVv+KbFbzimxWJYpsVgCKbFaQimxW/4psVv+KbFb/imxW/4psVv+KbFb/imxW/4psVv+KbFb/imxW/4psVv+KbFb/imxW/4psVo+KbFYAimxWxYpsVv+KbFb/imxW/4psVv+qkHz/39jS//Tz8v/z8vD/3djS/6qQff+KbFb/imxW/4psVv+KbFbEimxWAIpsVuWKbFb/imxW/4psVv+zmof/+/r6///////////////////////7+vr/s5qH/4psVv+KbFb/imxW5IpsVgCKbFbrj3Ne/49zXv+oj3z/+Pf2/////////////////8Wwof+oi3j////////////49/b/qI98/49zXv+KbFbrr5N/AJZ+agC3oor/3NbP/////////////////////////////////////////////////9zWz/+3oor/ln5qAL+pmQC/qZl6v6mZsL+pmf/z8O3////////////m39n/v6mZ/7+pmf/m39n////////////z8O3/v6mZ/7+pmf+/qZmwv6mZer+pmQC/qZkAv6mZ4M/Bt//y7+z/////////////////8u/s/9DAt/+/qZngv6mZ4NDAt//y7+z/////////////////8u/s/8/Bt/+/qZkAv6mZAL+pmUm/qZnQv6mZ/+DZ0P/////////////////g2dD/v6mZ/7+pmUm/qZlJv6mZ/+DZ0P/////////////////g2dD/v6mZAL+pmQC/qZkAv6mZAL+pmVu/qZm7v6mZ47+pmf+/qZn/v6mZ47+pmbu/qZlbv6mZAL+pmQC/qZlbv6mZu7+pmf/f2ND/v6mZAL+pmQC/qZkAv6mZAAAAAAAAAAAAv6mZAL+pmQC/qZkAv6mZAL+pmQC/qZkAv6mZAL+pmQAAAAAAAAAAAAAAAAC/qZkAv6mZAL+pmQC/qZkA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAA==';

// Convert base64 to buffer
const faviconBuffer = Buffer.from(faviconBase64, 'base64');

// Write to file
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconBuffer);

console.log('Favicon created successfully!');
