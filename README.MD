# 🤖 Web Scrapping Tech

Este projeto, desenvolvido utilizando **JavaScript** e **Puppeteer**, 
tem como propósito coletar notícias de tecnologia por 
meio da raspagem de dados de diversos sites especializados na área.

## Pré-requisitos

- Node 21.6.2
- NPM 10.5.0

## Instalação

1. Clone este repositório: `git clone https://github.com/gaiekdacosta/web-scraping-tech`
2. Acesse o diretório do projeto: `cd web-scraping-tech`
3. Instale as dependências: `npm install` ou `yarn install`

## Uso

1. Inicie o servidor: `npm start` ou `yarn start`.
2. Acesse a API em `http://localhost:4138`.

## Rotas

- **GET /getNews/:amount**:
  - Descrição: Retorna uma quantidade específica de notícias.
  - Parâmetros:
    - `:amount`: A quantidade de notícias a serem retornadas.
  - Exemplo de uso:
    - `GET /getNews/10`: Retorna as 10 notícias mais recentes.
