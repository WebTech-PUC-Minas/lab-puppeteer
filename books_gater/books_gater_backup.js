const puppeteer = require("puppeteer");
const fs = require("fs")
const path = require("path")

let resultados = [];

const pathDoArquivo = __dirname + '/' + "data" + '/' + "informacoes.json";

(async () => {
    await books_gater()
    const output = JSON.stringify(resultados, null, 2)
    fs.writeFileSync(pathDoArquivo, output)
})();

async function books_gater() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto("https://books.toscrape.com/catalogue/category/books_1/index.html");
    console.log("Lendo pagina: 1")

    const filhosOl = await page.evaluate(() => {
        const ol = document.querySelector("#default > div > div > div > div > section > div:nth-child(2) > ol")
        return ol.children.length
    })
    const quantPage = await page.evaluate(() => {
        const numPages = document.querySelector("#default > div > div > div > div > section > div:nth-child(2) > div > ul > li.current").innerText
        const numPagesCorrigidos = numPages.replace("Page 1 of ", "")
        return numPagesCorrigidos
    })
    for (let i = 2; i < quantPage; i++) {
        for (let j = 1; j < filhosOl+1; j++) {
            await page.waitForSelector(`#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(${j}) > article > div.image_container`)
            await page.click(`#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(${j}) > article > div.image_container`)
            await page.waitForTimeout(500)
            const x = await page.evaluate(() => {
                let estaDisponivel = document.querySelector("#content_inner > article > div.row > div.col-sm-6.product_main > p.instock.availability")?.innerText || "ERRO"
                if (estaDisponivel.includes("In stock")) {
                    estaDisponivel = estaDisponivel.replace("In stock (", "").replace(")", "")
                }
                return {
                    Titulo: document.querySelector("#content_inner > article > div.row > div.col-sm-6.product_main > h1")?.innerText || "ERRO",
                    Preco: document.querySelector("#content_inner > article > div.row > div.col-sm-6.product_main > p.price_color")?.innerText || "ERRO",
                    Disponivel: estaDisponivel,
                    Descricao: document.querySelector("#content_inner > article > p")?.innerText || "ERRO",
                    UPC: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(1) > td")?.innerText || "ERRO",
                    TipoDoProduto: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(2) > td")?.innerText || "ERRO",
                    PrecoSemTaxa: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(3) > td")?.innerText || "ERRO",
                    PrecoComTaxa: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(4) > td")?.innerText || "ERRO",
                    Taxa: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(5) > td")?.innerText || "ERRO",
                    NumeroDeAnalise: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(7) > td")?.innerText || "ERRO",
                    Url: ""
                }
            });
            x.Url = page.url()
            await resultados.push(x)
            await page.goBack()
            await page.waitForTimeout(1000)
        };
        const urlDaproximaPagina = `https://books.toscrape.com/catalogue/category/books_1/page-${i}.html`
        await page.goto(urlDaproximaPagina)
        await page.waitForTimeout(2000)
        console.log("Lendo pagina: " + i)
    }
    await browser.close();
}

