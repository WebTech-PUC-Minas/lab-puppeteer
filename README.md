<!-- Exemplo de uso do template: https://github.com/kspencerl/lab-springboot-basic-api -->

# Lab puppeteer
O objetivo deste lab é ensinar base da biblioteca npm puppeteer

### O que é
puppeteer é um framework do npm que é feito para utilizar junto ao node, que conssite em um navegador "autonomo" que pode ser programado para executar uma seria de açoes automatisadas exatamente como um usuario

## Tecnologias utilizadas
<!-- Link com os badges para inserir abaixo https://devicon.dev/ -->
<div style="display: flex; gap: 10px;">
  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg"/>  
  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg">
</div>

## Onde Aplicar
Este projeto pode ser aplicado em diversas situações:
- Testes automatizados/Interaçoes automatizadas
- Web scraping
- Geração de Screenshots ou PDFs


# Sumário

* [Instalação](#instalação)
* [Estruturas](#estruturas)
* [Projetos](#projetos)
* [Contato](#contato)

## Instalação

Siga com precisão as orientações de configuração do ambiente para assegurar eficácia consistente no desenvolvimento do projeto.

* [Windows](#windows)
* [Linux](#linux)

#### Windows:
Instale o setup da versão mais recente do node nesse link:
https://nodejs.org/en/download

Depois execute esse comando no powershell para verificar a versão:
```bash
node -v
npm -v
```
#### Linux:
Execute esse comando para instalar curl:
```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
```
Para verificar a isntalação utilize:
```bash
node -v
npm -v
```
> [!IMPORTANT]
> Essa instalação serve apenas para distribuição Ubuntu/Debian

## Estruturas

#### Estrutura de requisição
```js
const puppeteer = require('puppeteer');
```
Isso fara com que toda vez que for digitado puppeteer fara a chamada de requisição dos comandos do puppeteer

#### Estruturas de codigo funcional
Para começar é importante ressaltar que a biblioteca tem algumas exigencias

tudo deve estar contido em uma função async:
```js
async function nomeDaFuncao(){
  await ...
}
```
> [!IMPORTANT]
> await é um comando indispensavel para o funcinamento da biblioteca

Como mas um comando especifico para abrir um navegador
```js
const browser = await puppeteer.launch({ timeout: 1000, headless: false });
```
> headless pode ser mudado para "new", com o intuito de não ser exibido uma tela de navegador  

Para que seja funcional outro requisito nessesario teremos de colocar um comando no inicio de cada linha de comando
```js
await comando
```
Vamos agora para a introdução a comandos especificos
* Abertura de uma nova pagina e para ir para uma nova url
```js
const page = await browser.newPage();
await page.goto = page.goto('url', {timeout: 0})
```

* Tirar uma screenshot
```js
await page.screenshot({ path: 'caminhoDoArquivo' });
```

* Gerar um pdf da pagina
```js
await page.pdf({ path: 'caminhoDoArquivo', format: 'A4' });
```

* Preencher um input
```js
await page.locator("path do html").fill('o que sera escrito');
```

* Seleção de um elemento para uma ação posterior
```js
const element = await page.waitForSelector('body > center > form > input[type=button]');
```

* Comando para clicar em um elemento pre-selecionado 
```js
await element.click();
```

* comando para capturar informaçoes do site
```js
const NomeDaVariavel = document.querySelector("path do html");
```
> path do html refere ao caminho de divs e classes ate a chegada no elemento que você quer

## Projetos
**cada projeto tem seu roadmap proprio por isso cada um deles tem seu proprio readme**

[Clicar botao](clicar_botao) - Programa que mostra o funcionamento de uma aplicação que clica em um botão

[Google forms](google_forms) - Programa que prenche 500 veses um formulario do google

[Musica](musica) - Programa que faz a converção de uma url de uma musica do Deezer e recebe uma url do Spotfy

[Gerador de pdf](pdfGenerator) - Progarama que recebe uma url e retorna um pdf da pagina

[Prencher input](preencher_input) - Programa que prenceh um input com um texto especifico
## Contato
Email: [hsnahim@gmail.com](mailto:hsnahim@gmail.com)

GitHub: [hsnahim](https://github.com/hsnahim)

Linkedin: [Henrique Nahim](https://www.linkedin.com/in/henrique-nahim-3a71a8267/)
