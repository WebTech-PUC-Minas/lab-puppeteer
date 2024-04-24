# Gerador de PDF

# Sumário

- [Gerador de PDF](#gerador-de-pdf)
- [Sumário](#sumário)
  - [Instalação](#instalação)
  - [Código da aplicação](#código-da-aplicação)
  - [Resultado](#resultado)
  - [Mudança de teste](#mudança-de-teste)

## Instalação

Para inicializar o programa para teste, é necessário instalar os pré-requisitos contidos no `package.json`. Para instalá-los, basta abrir o terminal na pasta do arquivo e executar:

```bash
npm install
```

> No shell é nessesario estar no diretorio do projeto

> [!IMPORTANT]
> Lembre-se de ja ter feito as intruções contidas no [README](../README.md) principal

## Código da aplicação

O intuito desse codigo é entar em um link e gerar um pdf da pagina

A geração do pdf é feita pelo codigo `page.pdf`

```js
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
```

## Resultado

Primeiro entramos na pagina [https://pt.wikipedia.org/wiki/Pera](https://pt.wikipedia.org/wiki/Pera)

![1713959818521](image/README/1713959818521.png)

Apos isso o codigo ira retornar um pdf com a pagina inteira

## Mudança de teste

Para alterar a pagina para teste, basta modificar o link contido na variável global `url`
