const puppeteer = require('puppeteer');
const url = 'https://pt.wikipedia.org/wiki/Pera' 


async function capturaDePDF() {
    const browser = await puppeteer.launch({ timeout: 1000, headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: ['networkidle0', 'domcontentloaded'], timeout: 0 });
    await page.pdf({ path: 'exemplo.pdf', format: 'A4' });
    await browser.close();
}

capturaDePDF()