const puppeteer = require('puppeteer');

async function capturaDePDF() {
    const browser = await puppeteer.launch({ timeout: 1000, headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://pt.wikipedia.org/wiki/Pera', { waitUntil: ['networkidle0', 'domcontentloaded'], timeout: 0 });
    await page.pdf({ path: 'exemplo.pdf', format: 'A4' });
    await browser.close();
}

capturaDePDF()