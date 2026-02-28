<h1 align="center">
    Controle de Estoque — API
</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-estrutura">Estrutura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#banco-de-dados">Banco de Dados</a>
</p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-24-339933?logo=node.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Express" src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white">
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green">
</p>

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/) — Runtime JavaScript
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
- [Express](https://expressjs.com/) — Framework web para o backend
- [Prisma 7](https://www.prisma.io/) — ORM para acesso ao banco de dados
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional (hospedado no [Neon](https://neon.tech))
- [tsx](https://github.com/privatenumber/tsx) — Execução de TypeScript sem compilação
- [dotenv](https://github.com/motdotla/dotenv) — Variáveis de ambiente

---

## 💻 Projeto

A **API de Controle de Estoque** é o backend de um sistema industrial para gerenciamento de produtos e matérias-primas. Permite manter o cadastro de produtos, matérias-primas e suas associações, além de calcular automaticamente quais produtos podem ser produzidos com o estoque disponível, priorizando os de maior valor.

---

## 📡 Endpoints

### Produtos — `/api/products`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/products` | Lista todos os produtos |
| GET | `/api/products/:id` | Busca produto por ID |
| POST | `/api/products` | Cria um novo produto |
| PUT | `/api/products/:id` | Atualiza um produto |
| DELETE | `/api/products/:id` | Remove um produto |

**Exemplo de body (POST/PUT):**
```json
{
  "name": "Bolo de Chocolate",
  "value": 45.90,
  "rawMaterials": [
    { "rawMaterialId": 1, "quantity": 2 },
    { "rawMaterialId": 2, "quantity": 1 }
  ]
}
```

---

### Matérias-Primas — `/api/raw-materials`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/raw-materials` | Lista todas as matérias-primas |
| GET | `/api/raw-materials/:id` | Busca matéria-prima por ID |
| POST | `/api/raw-materials` | Cria uma nova matéria-prima |
| PUT | `/api/raw-materials/:id` | Atualiza uma matéria-prima |
| DELETE | `/api/raw-materials/:id` | Remove uma matéria-prima |

**Exemplo de body (POST/PUT):**
```json
{
  "name": "Farinha",
  "stock": 100
}
```

---

### Sugestão de Produção — `/api/production`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/production/suggestion` | Retorna sugestão de produção |

**Exemplo de resposta:**
```json
{
  "suggestion": [
    {
      "productId": 1,
      "productName": "Bolo de Chocolate",
      "value": 45.90,
      "quantity": 10,
      "totalValue": 459.00
    }
  ],
  "grandTotal": 459.00
}
```

---

## 🚀 Como executar

### Pré-requisitos
- Node.js 18+
- NPM
- Conta no [Neon](https://neon.tech) (PostgreSQL)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/lucasbars/estoque-api.git
cd estoque-api

# Instale as dependências
npm install
```

### Configuração do banco de dados

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@HOST.neon.tech/BANCO?sslmode=require"
```

### Migrations

```bash
# Rode as migrations
npx prisma migrate dev --name init

# Gere o Prisma Client
npx prisma generate
```

### Executar o servidor

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

A API estará disponível em `http://localhost:3000`. Para testar os endpoints utilize um cliente HTTP como:

- [Insomnia](https://insomnia.rest/download)
- [Postman](https://www.postman.com/downloads/)
- [Thunder Client](https://www.thunderclient.com/) — extensão do VS Code

---

## 📁 Estrutura

```
estoque-api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── server.ts
│   ├── app.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── controllers/
│   │   ├── productController.ts
│   │   ├── rawMaterialController.ts
│   │   └── productionController.ts
│   └── routes/
│       ├── productRoutes.ts
│       ├── rawMaterialRoutes.ts
│       └── productionRoutes.ts
└── generated/
    └── prisma/
```

---
<h2 id="banco-de-dados">🗄️ Banco de Dados</h2>

```
RawMaterial
  └── ProductRawMaterial (rawMaterialId)
        └── Product (productId)
```

| Tabela | Campos |
|--------|--------|
| Product | id, name, value, createdAt, updatedAt |
| RawMaterial | id, name, stock, createdAt, updatedAt |
| ProductRawMaterial | id, productId, rawMaterialId, quantity |

---

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

#### Desenvolvido por Lucas Barbosa 💜