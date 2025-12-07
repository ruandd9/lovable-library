# 📚 ApostilaPro - Plataforma de Apostilas Online

Uma plataforma moderna e completa para venda de apostilas digitais, com frontend em React e backend em Node.js.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎯 Sobre o Projeto

ApostilaPro é uma solução completa para venda e distribuição de apostilas educacionais online, oferecendo:

- ✅ **Catálogo Interativo**: Navegação por categorias com filtros avançados
- ✅ **Sistema de Autenticação**: Login seguro com JWT
- ✅ **Dashboard Personalizado**: Área do usuário com materiais comprados
- ✅ **Visualizador de PDF**: Leitor integrado de apostilas
- ✅ **Sistema de Pagamento**: Integração com Stripe
- ✅ **Design Moderno**: Interface responsiva com animações 3D
- ✅ **API RESTful**: Backend robusto e escalável

---

## 🏗️ Arquitetura do Projeto

```
lovable-library/
├── frontend/              # Aplicação React
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── contexts/     # Contextos React
│   │   ├── services/     # Serviços e API
│   │   ├── data/         # Dados estáticos
│   │   └── assets/       # Imagens e recursos
│   └── public/           # Arquivos públicos
│
└── backend/              # API Node.js
    ├── src/
    │   ├── models/       # Modelos Mongoose
    │   ├── routes/       # Rotas da API
    │   ├── middleware/   # Middlewares
    │   ├── controllers/  # Controladores
    │   └── config/       # Configurações
    └── .env              # Variáveis de ambiente
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **React** | 18.3 | Biblioteca JavaScript para UI |
| **TypeScript** | 5.5 | Superset tipado do JavaScript |
| **Vite** | 5.4 | Build tool e dev server |
| **React Router** | 6.26 | Roteamento SPA |
| **TanStack Query** | 5.56 | Gerenciamento de estado assíncrono |
| **Tailwind CSS** | 3.4 | Framework CSS utilitário |
| **shadcn/ui** | - | Componentes UI acessíveis |
| **Framer Motion** | 11.5 | Biblioteca de animações |
| **Axios** | 1.7 | Cliente HTTP |
| **React Hook Form** | 7.53 | Gerenciamento de formulários |
| **Zod** | 3.23 | Validação de schemas |
| **Lucide React** | 0.446 | Ícones modernos |

### Backend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Node.js** | 18+ | Runtime JavaScript |
| **Express** | 4.18 | Framework web |
| **MongoDB** | 7+ | Banco de dados NoSQL |
| **Mongoose** | 8.0 | ODM para MongoDB |
| **JWT** | 9.0 | Autenticação via tokens |
| **bcryptjs** | 2.4 | Hash de senhas |
| **Stripe** | 20.0 | Gateway de pagamento |
| **CORS** | 2.8 | Cross-Origin Resource Sharing |
| **dotenv** | 16.3 | Variáveis de ambiente |

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **MongoDB** (versão 7 ou superior) - [Download](https://www.mongodb.com/try/download/community)
- **npm** ou **yarn** - Gerenciador de pacotes
- **Git** - Controle de versão

---

## 🚀 Instalação e Configuração

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/seu-usuario/lovable-library.git
cd lovable-library
```

### 2️⃣ Configurar o Backend

#### Instalar dependências

```bash
cd backend
npm install
```

#### Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `backend/`:

```env
# Servidor
PORT=3001
NODE_ENV=development

# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/apostilas

# Autenticação
JWT_SECRET=seu_secret_super_seguro_mude_isso_em_producao
JWT_EXPIRE=30d

# Frontend
FRONTEND_URL=http://localhost:5173

# Stripe (opcional)
STRIPE_SECRET_KEY=sk_test_sua_chave_aqui
STRIPE_WEBHOOK_SECRET=whsec_sua_chave_aqui
```

#### Iniciar MongoDB

**Windows:**
```bash
mongod
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
```

**Ou use MongoDB Atlas (cloud):**
- Crie uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Crie um cluster gratuito
- Obtenha a connection string e use no `.env`

#### Popular o banco de dados (opcional)

```bash
node src/scripts/seedApostilas.js
```

#### Iniciar o servidor backend

```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

✅ Backend rodando em: `http://localhost:3001`

### 3️⃣ Configurar o Frontend

#### Voltar para a raiz e instalar dependências

```bash
cd ..
npm install
```

#### Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3001/api
```

#### Iniciar o servidor frontend

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

✅ Frontend rodando em: `http://localhost:5173`

---

## 📚 Documentação da API

### Base URL
```
http://localhost:3001/api
```

### 🔐 Autenticação

#### Registrar Usuário
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "673abc...",
      "name": "João Silva",
      "email": "joao@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

#### Obter Dados do Usuário
```http
GET /auth/me
Authorization: Bearer {token}
```

### 📖 Apostilas

#### Listar Todas
```http
GET /apostilas
GET /apostilas?category=Concursos
GET /apostilas?search=matematica
GET /apostilas?sort=price&order=asc
```

#### Obter Detalhes
```http
GET /apostilas/:id
```

#### Por Categoria
```http
GET /apostilas/category/Concursos
```

**Categorias disponíveis:**
- `Concursos`
- `Vestibulares`
- `ENEM`
- `Direito`

### 💳 Compras

#### Realizar Compra
```http
POST /purchases
Authorization: Bearer {token}
Content-Type: application/json

{
  "apostilaId": "673abc123def456",
  "paymentMethod": "credit_card"
}
```

#### Listar Compras do Usuário
```http
GET /purchases/user
Authorization: Bearer {token}
```

#### Detalhes de uma Compra
```http
GET /purchases/:id
Authorization: Bearer {token}
```

---

## 🗄️ Modelos de Dados

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, required),
  password: String (hashed, required),
  purchasedApostilas: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Apostila
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  longDescription: String,
  price: Number (required),
  originalPrice: Number,
  category: String (required),
  cover: String,
  pages: Number,
  rating: Number (0-5),
  reviews: Number,
  features: [String],
  author: String,
  lastUpdate: String,
  language: String,
  level: String,
  topics: [String],
  pdfUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Purchase
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User'),
  apostila: ObjectId (ref: 'Apostila'),
  price: Number,
  paymentMethod: String,
  status: String (enum: ['pending', 'completed', 'failed']),
  purchaseDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📁 Estrutura de Pastas Detalhada

### Frontend (`/`)

```
src/
├── assets/
│   └── covers/              # Capas das apostilas
├── components/
│   ├── ui/                  # Componentes shadcn/ui
│   ├── ApostilaCard.tsx     # Card de apostila
│   ├── Card3D.tsx           # Efeito 3D nos cards
│   ├── FloatingElements.tsx # Elementos flutuantes
│   ├── Navbar.tsx           # Barra de navegação
│   ├── Footer.tsx           # Rodapé
│   ├── PDFViewer.tsx        # Visualizador de PDF
│   └── PurchaseModal.tsx    # Modal de compra
├── contexts/
│   └── AuthContext.tsx      # Contexto de autenticação
├── data/
│   └── apostilas.ts         # Dados das apostilas (fallback)
├── hooks/
│   └── use-toast.ts         # Hook de notificações
├── lib/
│   └── utils.ts             # Funções utilitárias
├── pages/
│   ├── Index.tsx            # Página inicial
│   ├── Login.tsx            # Página de login
│   ├── Cadastro.tsx         # Página de cadastro
│   ├── Catalogo.tsx         # Catálogo de apostilas
│   ├── Dashboard.tsx        # Dashboard do usuário
│   └── ApostilaDetails.tsx  # Detalhes da apostila
├── services/
│   └── api.ts               # Configuração do Axios
├── App.tsx                  # Componente raiz
└── main.tsx                 # Entry point
```

### Backend (`/backend`)

```
src/
├── config/
│   └── database.js          # Configuração MongoDB
├── controllers/
│   ├── authController.js    # Lógica de autenticação
│   ├── apostilasController.js
│   └── purchasesController.js
├── middleware/
│   ├── auth.js              # Middleware de autenticação
│   └── errorHandler.js      # Tratamento de erros
├── models/
│   ├── User.js              # Modelo de usuário
│   ├── Apostila.js          # Modelo de apostila
│   └── Purchase.js          # Modelo de compra
├── routes/
│   ├── auth.js              # Rotas de autenticação
│   ├── apostilas.js         # Rotas de apostilas
│   └── purchases.js         # Rotas de compras
├── scripts/
│   └── seedApostilas.js     # Script para popular DB
└── server.js                # Servidor Express
```

---

## 🎨 Funcionalidades Principais

### 🏠 Página Inicial
- Hero section com animações 3D
- Apostilas em destaque
- Depoimentos de alunos
- Estatísticas da plataforma

### 📚 Catálogo
- Grid responsivo de apostilas
- Filtros por categoria
- Busca por texto
- Ordenação (preço, avaliação, nome)
- Cards com efeitos 3D e hover

### 🔐 Autenticação
- Login com email e senha
- Cadastro de novos usuários
- Validação de formulários
- Tokens JWT com expiração
- Proteção de rotas

### 👤 Dashboard
- Apostilas compradas
- Visualizador de PDF integrado
- Controles de navegação
- Progresso de leitura (futuro)

### 💳 Sistema de Compras
- Modal de checkout
- Integração com Stripe
- Histórico de compras
- Confirmação por email (futuro)

---

## 🧪 Testando a Aplicação

### Credenciais de Teste

Após popular o banco de dados:

```
Email: teste@email.com
Senha: 123456
```

### Testando a API

Use ferramentas como:
- **Postman** - [Download](https://www.postman.com/)
- **Insomnia** - [Download](https://insomnia.rest/)
- **Thunder Client** (extensão VS Code)

Importe a collection de exemplo em `backend/postman/`

---

## 🔒 Segurança

- ✅ Senhas hasheadas com bcrypt (10 rounds)
- ✅ Autenticação via JWT
- ✅ Tokens com expiração configurável
- ✅ Validação de dados com express-validator
- ✅ CORS configurado
- ✅ Proteção contra NoSQL injection
- ✅ Rate limiting (futuro)
- ✅ HTTPS em produção (recomendado)

---

## 🚀 Deploy

### Frontend (Vercel/Netlify)

```bash
# Build
npm run build

# A pasta dist/ contém os arquivos estáticos
```

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Backend (Railway/Render/Heroku)

**Railway:**
1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy automático

**Render:**
1. Crie um novo Web Service
2. Conecte o repositório
3. Configure build command: `cd backend && npm install`
4. Configure start command: `cd backend && npm start`

**MongoDB Atlas:**
- Use MongoDB Atlas para produção
- Configure IP whitelist
- Use connection string no `.env`

---

## 📊 Roadmap

### ✅ Implementado
- [x] Sistema de autenticação
- [x] Catálogo de apostilas
- [x] Dashboard do usuário
- [x] Visualizador de PDF
- [x] Sistema de compras
- [x] Design responsivo
- [x] Animações 3D

### 🔄 Em Desenvolvimento
- [ ] Sistema de preview/amostra grátis
- [ ] Progresso de leitura
- [ ] Anotações no PDF
- [ ] Sistema de avaliações
- [ ] Cupons de desconto

### 📅 Planejado
- [ ] Carrinho de compras múltiplas
- [ ] Recuperação de senha
- [ ] Notificações por email
- [ ] Painel administrativo
- [ ] Analytics e relatórios
- [ ] App mobile (React Native)

---

## 🐛 Troubleshooting

### Erro de conexão com MongoDB
```bash
# Verifique se o MongoDB está rodando
mongod --version

# Inicie o serviço
sudo systemctl start mongod  # Linux
mongod                       # Windows/Mac
```

### Erro de porta em uso
```bash
# Mate o processo na porta 3001
npx kill-port 3001

# Ou mude a porta no .env
PORT=3002
```

### Token inválido
- Verifique se o `JWT_SECRET` é o mesmo no backend
- Faça logout e login novamente
- Limpe o localStorage do navegador

### CORS Error
- Verifique se `FRONTEND_URL` está correto no `.env` do backend
- Confirme que o backend está rodando
- Verifique as configurações de CORS em `server.js`

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript no frontend
- Siga o ESLint configurado
- Escreva commits semânticos
- Documente funções complexas
- Adicione testes quando possível

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autores

- **Seu Nome** - *Desenvolvimento inicial* - [GitHub](https://github.com/seu-usuario)

---

## 📞 Suporte

- 📧 Email: suporte@apostilapro.com
- 💬 Discord: [Link do servidor]
- 📱 WhatsApp: (11) 99999-9999

---

## 🙏 Agradecimentos

- [React](https://react.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)

---

<div align="center">

**Desenvolvido com ❤️ usando React, TypeScript e Node.js**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
