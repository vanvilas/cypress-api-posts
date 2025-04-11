# 📰 Paginação de Posts com Cypress + API

Este projeto simula um blog com posts carregados a partir de uma API pública (`JSONPlaceholder`).
O objetivo foi implementar **paginação real** e testar o carregamento progressivo dos dados usando **Cypress**.

---

## 🚀 Funcionalidades

- Consumo de dados da API `https://jsonplaceholder.typicode.com/posts`
- Paginação de 3 em 3 posts ao clicar no botão "Ver mais posts"
- Ocultação automática do botão ao atingir o fim da lista
- Reset da lista com botão ao atingir o fim da lista
- Reset da lista com botão "Reiniciar Lista" 
- Testes automatizados com Cypress cobrindo:
    - Primeira carga de posts
    - Carga de mais posts
    - Ocultação do botão
    - Reset do conteúdo

---

## 🧪 Testes Automatizados

Os testes foram feitos com **Cypress** e se encontram na pasta `cypress/e2e`.

### Exemplo de testes cobertos:

- `carrega os 3 primeiros posts da API`
- `carrega mais 3 posts ao clicar no botão`
- `deve esconder o botão após carregar todos os posts`
- `reinicia a lista de posts`

---

## 📸 Imagem dos testes passando

> ![Testes passando no Cypress](./print.png)

---

## 🛠️ Tecnologias 

- HTML, CSS e JavScript (Vanilla)
- API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/) 
- [Cypress](https://www.cypress.io/) para testes E2E

---

## 🗂️ Como rodar o projeto

1. Clone o repositório:
```bash
git clone [https://github.com/vanvilas/cypress-api-posts.git]
cd cypress-api-posts
```
2. Instale as dependências:
```bash
npm install
```
3. Inicie um servidor local para abrir o `index.html`. Ex:
```bash
npx live-server
```
4. Rode os testes:
```bash
npx cypress open
```

---

👩‍💻 Feito por

Vanessa — 
[LinkedIn](https://www.linkedin.com/in/vanessa-vilas-boas/)
