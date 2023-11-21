const puppeteer = require('puppeteer');

async function clicarButao() {
    const browser = await puppeteer.launch({ timeout: 1000, headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://www.lncc.br/~borges/php/testar.html', { waitUntil: ['networkidle0', 'domcontentloaded'], timeout: 10000 });
    await page.screenshot({ path: 'antes.png' });
    const element = await page.waitForSelector('body > center > form > input[type=button]');
    await element.click();
    await page.screenshot({ path: 'depois.png' });
    await browser.close();
}

clicarButao();
