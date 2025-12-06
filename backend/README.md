# 🚀 Backend - API de Apostilas Online

API RESTful para gerenciamento de usuários, apostilas e compras.

## 📋 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas

## 🔧 Instalação

### 1. Instalar MongoDB

**Windows:**
- Baixe em: https://www.mongodb.com/try/download/community
- Ou use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

**Linux/Mac:**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Mac (Homebrew)
brew install mongodb-community
```

### 2. Instalar dependências

```bash
cd backend
npm install
```

### 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/apostilas
JWT_SECRET=seu_secret_super_seguro_mude_isso
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Popular o banco de dados (opcional)

```bash
node src/scripts/seedApostilas.js
```

### 5. Iniciar o servidor

**Desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor estará rodando em: `http://localhost:3001`

## 📚 Endpoints da API

### Autenticação

#### Registrar usuário
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Obter dados do usuário
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Apostilas

#### Listar todas
```http
GET /api/apostilas
GET /api/apostilas?category=Concursos
GET /api/apostilas?search=matematica
```

#### Obter detalhes
```http
GET /api/apostilas/:id
```

#### Por categoria
```http
GET /api/apostilas/category/Concursos
```

### Compras

#### Realizar compra
```http
POST /api/purchases
Authorization: Bearer {token}
Content-Type: application/json

{
  "apostilaId": "673abc123def456",
  "paymentMethod": "credit_card"
}
```

#### Listar compras do usuário
```http
GET /api/purchases/user
Authorization: Bearer {token}
```

#### Detalhes de uma compra
```http
GET /api/purchases/:id
Authorization: Bearer {token}
```

## 🗄️ Estrutura do Banco de Dados

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  purchasedApostilas: [ObjectId],
  createdAt: Date
}
```

### Apostila
```javascript
{
  title: String,
  description: String,
  price: Number,
  category: String,
  cover: String,
  pages: Number,
  rating: Number,
  features: [String],
  // ... outros campos
}
```

### Purchase
```javascript
{
  user: ObjectId,
  apostila: ObjectId,
  price: Number,
  paymentMethod: String,
  status: String,
  purchaseDate: Date
}
```

## 🔐 Segurança

- Senhas são hasheadas com bcrypt
- Autenticação via JWT
- Tokens expiram em 30 dias
- Validação de dados com express-validator
- CORS configurado

## 🧪 Testando a API

Use ferramentas como:
- **Postman** - https://www.postman.com/
- **Insomnia** - https://insomnia.rest/
- **Thunder Client** (extensão VS Code)

## 📝 Próximos Passos

1. Integrar com gateway de pagamento (Stripe, Mercado Pago)
2. Adicionar upload de arquivos (apostilas PDF)
3. Sistema de avaliações e comentários
4. Recuperação de senha por email
5. Testes automatizados
6. Deploy (Heroku, Railway, Render)

## 🐛 Troubleshooting

**Erro de conexão com MongoDB:**
- Verifique se o MongoDB está rodando: `mongod`
- Confirme a URI no arquivo `.env`

**Erro de porta em uso:**
- Mude a porta no `.env`
- Ou mate o processo: `npx kill-port 3001`

**Token inválido:**
- Verifique se o JWT_SECRET é o mesmo
- Faça login novamente para obter novo token
