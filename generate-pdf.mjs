import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'index.html');

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});

const page = await browser.newPage();
await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

// Set viewport to match the page width
await page.setViewport({ width: 612, height: 792, deviceScaleFactor: 2 });

// Print the .page div as a tight PDF at letter size
await page.pdf({
  path: path.join(__dirname, 'Daniela_Masmela_Habib_Resume.pdf'),
  width: '612px',
  height: '792px',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
console.log('PDF saved: Daniela_Masmela_Habib_Resume.pdf');
