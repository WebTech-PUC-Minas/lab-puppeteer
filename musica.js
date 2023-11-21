const puppeteer = require("puppeteer");

async function getDadosMusica() {
  const browser = await puppeteer.launch({ timeout: 1000, headless: false });
  const page = await browser.newPage();

  await page.goto('https://deezer.page.link/BxLUVpTUCEUSH3oz9', { waitUntil: ['networkidle0', 'domcontentloaded'], timeout: 0 });

  const dadosMusica = await page.evaluate(() => {
    const NomeMusicaElement = document.querySelector("#page_naboo_track > div.catalog-content > div > div.css-1xh3s9i > div > h2");
    const AutoriaElements = document.querySelectorAll("#page_naboo_track > div.catalog-content > div > div.css-1xh3s9i > div > div > p");

    const Autoria = Array.from(AutoriaElements).map(element => element.textContent.trim()).join(', ');

    return {
      NomeMusica: NomeMusicaElement ? NomeMusicaElement.textContent.trim() : null,
      Autoria: Autoria,
    };
  });

  await page.goto("https://open.spotify.com/search")
  await page.locator("#main > div > div.ZQftYELq0aOsg6tPbVbV > div.jEMA2gVoLgPQqAFrPhFw > header > div.rovbQsmAS_mwvpKHaVhQ > div > div > form > input").fill(dadosMusica.NomeMusica + " " + dadosMusica.Autoria)
  await page.waitForTimeout(5000);

  const musica = await page.waitForSelector("#searchPage > div > div > section.QVIrLvegL13F9cEdMqfT.rjgEnbv42_EUDbaiZnA2 > div.iKwGKEfAfW7Rkx2_Ba4E > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div.gvLrgQXBFVW6m9MscfFA > div.iCQtmPqY0QvkumAOuCjr > a > div")
  await musica.click()

  const linkSpotfi = page.url()
  console.log(linkSpotfi)

  await browser.close();
}

getDadosMusica();
