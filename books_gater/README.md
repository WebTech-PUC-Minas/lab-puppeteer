# Preencher Input

# Sumário

* [Instalação](#Instalação)
* [Código da aplicação](#código-da-aplicação)
* [Resultado](#resultado)

## Instalação

Para inicializar o programa para teste, é necessário instalar os pré-requisitos contidos no `package.json`. Para instalá-los, basta abrir o terminal na pasta do arquivo e executar:

```bash
npm install
```

> No shell é nessesario estar no diretorio do projeto

> [!IMPORTANT]
> Lembre-se de ja ter feito as intruções contidas no [README](../README.md) principal

## Código da aplicação

O intuito deste programa consiste em obter dados de livros contidos no site e colocalos em um arquivo json.

## Resultado

O codigo entrara no link [https://books.toscrape.com/catalogue/page-1.html](https://books.toscrape.com/catalogue/page-1.html) e captura a quantidade de paginas e a qunatidade de linhos na pagina

![1713968218672](image/README/1713968218672.png)

Então entrara na pagina de cada livro individualmente

![1713968293845](image/README/1713968293845.png)

E seguira nesse prosseso ate acababar os livros da pagina, que fara com que o codigo clicke no botao next, repetira todo o prosseso anterior ate que acabe as paginas

![1713968420964](image/README/1713968420964.png)

E por fim o codigo vai gerar um arquivo `json` com todos os dados dos livros
