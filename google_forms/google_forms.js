
const puppeteer = require('puppeteer');

async function preencherInput() {
    const browser = await puppeteer.launch({ timeout: 1000, headless: "new" });
    const page = await browser.newPage();
    for (let i = 0; i < 500; i++) {
        console.log("carregando... " + i)
        await page.goto('https://forms.gle/xEBpuUZknuxFMY8T7', { waitUntil: ['networkidle0', 'domcontentloaded'], timeout: 0 });
        await page.locator("#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input").fill('ola funcionou');
        const element = await page.waitForSelector('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.ThHDze > div.DE3NNc.CekdCb > div.lRwqcd > div > span > span');
        await element.click();
        await page.waitForTimeout(2000);
    }
    await browser.close();
}
preencherInput();
