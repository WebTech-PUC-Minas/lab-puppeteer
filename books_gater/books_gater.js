const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

let resultados = [];

const pathDoArquivo = __dirname + '/' + "data" + '/' + "informacoes.json";

const Bottleneck = require('bottleneck/es5');
const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 30000
});

async function comecar() {
    await books_gater();
    const output = JSON.stringify(resultados, null, 2);
    fs.writeFileSync(pathDoArquivo, output);
};

comecar()

async function books_gater() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://books.toscrape.com/catalogue/category/books_1/index.html");
    console.log("Lendo pagina: 1");

    const livrosPorPagina = await page.evaluate(() => {
        const ol = document.querySelector("#default > div > div > div > div > section > div:nth-child(2) > ol");
        return ol.children.length;
    });
    const quantPage = await page.evaluate(() => {
        const numPages = document.querySelector("#default > div > div > div > div > section > div:nth-child(2) > div > ul > li.current").innerText;
        const numPagesCorrigidos = numPages.replace("Page 1 of ", "");
        return numPagesCorrigidos;
    });
    
    // Array para armazenar todas as promessas de processamento de páginas
    const pagePromises = [];
    
    await browser.close();

    for (let i = 2; i <= quantPage; i++) {
        pagePromises.push(limiter.schedule(() => { processPage(i, livrosPorPagina) }));
    }

    // Aguardar todas as promessas serem resolvidas
    await limiter.schedule(() => { Promise.all(pagePromises) })

}

async function processPage(pageNumber, livrosPorPagina) {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage();
    const urlDaproximaPagina = `https://books.toscrape.com/catalogue/category/books_1/page-${pageNumber}.html`;
    await page.goto(urlDaproximaPagina);
    console.log("Lendo pagina: " + pageNumber)
    for (let j = 1; j <= livrosPorPagina; j++) {
        await page.waitForSelector(`#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(${j}) > article > div.image_container`, {timeout: 0});
        await page.click(`#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(${j}) > article > div.image_container`);
        await page.waitForTimeout(500);
        const x = await page.evaluate(() => {
            let estaDisponivel = document.querySelector("#content_inner > article > div.row > div.col-sm-6.product_main > p.instock.availability")?.innerText || "ERRO";
            if (estaDisponivel.includes("In stock")) {
                estaDisponivel = estaDisponivel.replace("In stock (", "").replace(")", "");
            }
            return {
                title: document.querySelector("#content_inner > article > div.row > div.col-sm-6.product_main > h1")?.innerText || "ERRO",
                preco: document.querySelector("#content_inner > article > div.row > div.col-sm-6.product_main > p.price_color")?.innerText || "ERRO",
                disponivel: estaDisponivel,
                descricao: document.querySelector("#content_inner > article > p")?.innerText || "ERRO",
                UPC: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(1) > td")?.innerText || "ERRO",
                tipoDoProduto: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(2) > td")?.innerText || "ERRO",
                precoSemTaxa: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(3) > td")?.innerText || "ERRO",
                precoComTaxa: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(4) > td")?.innerText || "ERRO",
                taxa: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(5) > td")?.innerText || "ERRO",
                numeroDeAnalise: document.querySelector("#content_inner > article > table > tbody > tr:nth-child(7) > td")?.innerText || "ERRO",
                url: ""
            };
        });
        x.url = page.url();
        resultados.push(x);
        await page.goBack();
        await page.waitForTimeout(1000);
    }

    await browser.close();
}
