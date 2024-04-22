<!-- Exemplo de uso do template: https://github.com/kspencerl/lab-springboot-basic-api -->

# Lab puppeteer
O objetivo deste lab é ensinar base da biblioteca npm puppeteer

### O que é
puppeteer é uma biblioteca do npm que é feito para ser utilizado no nodeJS, ele consiste em um navegador "autônomo" que pode ser programado para executar uma série de ações automatizadas exatamente como um usuário, além de ter acesso a funções do próprio navegador.

## Tecnologias utilizadas
<!-- Link com os badges para inserir abaixo https://devicon.dev/ -->
<div style="display: flex; gap: 10px;">
  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg"/>  
  <img width="50px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg">
</div>

## Onde Aplicar
Este projeto pode ser aplicado em diversas situações:
- Testes automatizados/Interações automatizadas
- Web scraping
- Geração de Screenshots e/ou PDFs


# Sumário

* [Instalação](#instalação)
* [Estruturas](#estruturas)
* [Projetos](#projetos)
* [Contato](#contato)

## Instalação

Siga com precisão as orientações de configuração do ambiente para assegurar eficácia no desenvolvimento do projeto.

* [Windows](#windows)
* [Linux](#linux)

#### Windows:
Instale o setup da versão mais recente do node nesse link:
https://nodejs.org/en/download

Depois, execute esse comando no powershell para verificar a versão:
```bash
node -v
npm -v
```
#### Linux:
Execute esse comando no shell para instalar curl:
```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
```
Para verificar a instalação utilize:
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
Isso fará com que, dentro da constante, todas as funções da biblioteca fiquem armazenadas, por isso, toda vez que for requisitada, irá carregar consigo tudo do puppeteer

#### Estruturas de codigo funcional
Para começar, é importante ressaltar que a biblioteca tem algumas exigências

tudo deve estar contido em uma função async:
```js
async function nomeDaFuncao(){
  await ...
}
```
> [!IMPORTANT]
> await é um comando indispensável para o funcinamento da biblioteca

Esse é um comando específico para abrir um navegador
```js
const browser = await puppeteer.launch({ timeout: 1000, headless: false });
```
> headless pode ser mudado para "new", com o intuito de não ser exibida uma tela de navegador  

Para que seja funcional, outro requisito nessesário é colocar um comando no início de cada linha de comando
```js
const variavel = await comando
// ou
await comando
```
Agora, vamos introduzir comandos específicos
* Abertura de uma nova guia
```js
const page = await browser.newPage();
```

* Ir para uma nova url na nova guia
```js
await page.goto('url')
```

* Tirar uma screenshot
```js
await page.screenshot({ path: 'caminhoDoArquivo' });
```

* Gerar um pdf da página
```js
await page.pdf({ path: 'caminhoDoArquivo', format: 'A4' });
```

* Preencher um input
```js
await page.locator("path do html").fill('o que sera escrito');
```

* Seleção de um elemento para uma ação posterior
```js
const element = await page.waitForSelector('path do html');
```

* Comando para clicar em um elemento pré-selecionado (feito no exemplo acima)
```js
await element.click();
```

* Comando para capturar informações do site
```js
const nomeDaVariavel = await page.evaluate (() => {
const NomeDaVariavel = document.querySelector("path do html");
return NomeDaVariavel
}
```

* Comando para esperar ligaçoes exteriores com a internet cessarem
```js
await page.waitForNetworkIdle({concurrency: qunatidade de atividades simuntaneas, idleTime: tempo de inativiade })
```
> path do html se refere ao caminho de divs, classes e ids até a chegada ao elemento que você quer

## Projetos
**cada projeto tem seu roadmap próprio, por isso cada um deles tem seu próprio readme**

[Clicar botao](clicar_botao) - Programa que mostra o funcionamento de uma aplicação a qual clica em um botão

[Google forms](google_forms) - Programa que prenche 500 vezes um formulário do google

[Musica](musica) - Programa que faz a conversão da url de uma música no Deezer e devolve a url da mesma música no Spotfy

[Gerador de pdf](pdfGenerator) - Progarama que recebe uma url e retorna um pdf da página

[Prencher input](preencher_input) - Programa que prenche um input com um texto específico

[Captador de preços](prices_geter) - Programa que retorna arquivos com dados de produtos e especificações

[Captador de livros](books_gater) - Progaram que retorna vários livros e suas especificações
## Contato
Email: [hsnahim@gmail.com](mailto:hsnahim@gmail.com)

GitHub: [hsnahim](https://github.com/hsnahim)

Linkedin: [Henrique Nahim](https://www.linkedin.com/in/henrique-nahim-3a71a8267/)
