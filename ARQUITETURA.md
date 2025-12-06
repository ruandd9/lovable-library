# 🏗️ Arquitetura do Sistema

## 📊 Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                         USUÁRIO                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  UI Layer (shadcn/ui + Tailwind CSS)                 │   │
│  │  - Componentes reutilizáveis                         │   │
│  │  - Design system consistente                         │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages (React Router)                                │   │
│  │  - Index, Login, Cadastro, Catálogo                  │   │
│  │  - Dashboard, ApostilaDetails                        │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  State Management                                    │   │
│  │  - AuthContext (autenticação)                        │   │
│  │  - React Query (cache e sincronização)               │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Services                                            │   │
│  │  - API client (axios/fetch)                          │   │
│  │  - Interceptors de autenticação                      │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Node.js + Express)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes Layer                                        │   │
│  │  - /api/auth (autenticação)                          │   │
│  │  - /api/apostilas (catálogo)                         │   │
│  │  - /api/purchases (compras)                          │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Middleware Layer                                    │   │
│  │  - CORS                                              │   │
│  │  - JWT Authentication                                │   │
│  │  - Express Validator                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Business Logic                                      │   │
│  │  - Controllers                                       │   │
│  │  - Validações                                        │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Data Access Layer (Mongoose)                       │   │
│  │  - Models: User, Apostila, Purchase                 │   │
│  │  - Schemas e validações                             │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                        │
│  - Collections: users, apostilas, purchases                 │
│  - Índices otimizados                                       │
│  - Relacionamentos via ObjectId                             │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Camadas da Aplicação

### 1. Frontend (React + TypeScript)

**Tecnologias:**
- React 18.3 + TypeScript
- Vite (build tool)
- React Router DOM (navegação)
- TanStack Query (gerenciamento de estado servidor)
- shadcn/ui + Radix UI (componentes)
- Tailwind CSS (estilização)
- Framer Motion (animações)

**Estrutura de Pastas:**
```
src/
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes reutilizáveis
│   ├── ui/         # Componentes shadcn/ui
│   ├── ApostilaCard.tsx
│   ├── Navbar.tsx
│   └── ...
├── contexts/        # Context API (AuthContext)
├── hooks/          # Custom hooks
├── lib/            # Utilitários (utils.ts)
├── pages/          # Páginas da aplicação
│   ├── Index.tsx
│   ├── Login.tsx
│   ├── Cadastro.tsx
│   ├── Catalogo.tsx
│   ├── Dashboard.tsx
│   └── ApostilaDetails.tsx
├── services/       # Integração com API
│   └── api.ts
├── data/           # Dados mockados
└── App.tsx         # Componente raiz
```

**Fluxo de Dados:**
1. Usuário interage com UI
2. Componente dispara ação (ex: login)
3. Service faz requisição HTTP
4. React Query gerencia cache e estado
5. Context atualiza estado global
6. UI re-renderiza automaticamente

### 2. Backend (Node.js + Express)

**Tecnologias:**
- Node.js + Express
- MongoDB + Mongoose
- JWT (autenticação)
- bcryptjs (hash de senhas)
- express-validator (validação)
- CORS (segurança)

**Estrutura de Pastas:**
```
backend/src/
├── config/
│   └── database.js      # Configuração MongoDB
├── middleware/
│   └── auth.js          # Middleware JWT
├── models/
│   ├── User.js          # Schema de usuário
│   ├── Apostila.js      # Schema de apostila
│   └── Purchase.js      # Schema de compra
├── routes/
│   ├── auth.js          # Rotas de autenticação
│   ├── apostilas.js     # Rotas de apostilas
│   └── purchases.js     # Rotas de compras
├── scripts/
│   └── seedApostilas.js # Seed do banco
└── server.js            # Entry point
```

**Endpoints Principais:**

```
POST   /api/auth/register        # Cadastro
POST   /api/auth/login           # Login
GET    /api/auth/me              # Dados do usuário (protegido)

GET    /api/apostilas            # Listar apostilas
GET    /api/apostilas/:id        # Detalhes da apostila
POST   /api/apostilas            # Criar apostila (admin)
PUT    /api/apostilas/:id        # Atualizar apostila (admin)
DELETE /api/apostilas/:id        # Deletar apostila (admin)

POST   /api/purchases            # Realizar compra (protegido)
GET    /api/purchases/my         # Minhas compras (protegido)
GET    /api/purchases/:id        # Detalhes da compra (protegido)
```

### 3. Banco de Dados (MongoDB)

**Collections:**

**users:**
```javascript
{
  _id: ObjectId,
  nome: String,
  email: String (unique),
  senha: String (hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

**apostilas:**
```javascript
{
  _id: ObjectId,
  titulo: String,
  descricao: String,
  categoria: String,
  preco: Number,
  nivel: String (enum: ['Iniciante', 'Intermediário', 'Avançado']),
  duracao: String,
  autor: String,
  rating: Number,
  totalAvaliacoes: Number,
  imagemCapa: String,
  conteudo: String,
  topicos: [String],
  createdAt: Date,
  updatedAt: Date
}
```

**purchases:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  apostilaId: ObjectId (ref: 'Apostila'),
  preco: Number,
  status: String (enum: ['pending', 'completed', 'cancelled']),
  metodoPagamento: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Fluxo de Autenticação

```
1. Usuário envia credenciais (email + senha)
   ↓
2. Backend valida credenciais
   ↓
3. bcryptjs compara hash da senha
   ↓
4. JWT é gerado com payload { userId, email, role }
   ↓
5. Token é enviado ao frontend
   ↓
6. Frontend armazena token (localStorage/sessionStorage)
   ↓
7. Requisições subsequentes incluem token no header:
   Authorization: Bearer <token>
   ↓
8. Middleware auth.js valida token em rotas protegidas
   ↓
9. Se válido, req.user é populado e requisição prossegue
```

## 🛒 Fluxo de Compra

```
1. Usuário navega pelo catálogo
   ↓
2. Clica em "Comprar" em uma apostila
   ↓
3. Modal de compra é exibido
   ↓
4. Usuário confirma compra
   ↓
5. Frontend envia POST /api/purchases
   ↓
6. Backend valida:
   - Usuário autenticado?
   - Apostila existe?
   - Usuário já comprou?
   ↓
7. Purchase é criado no banco
   ↓
8. Resposta é enviada ao frontend
   ↓
9. UI atualiza (apostila aparece em "Minhas Apostilas")
```

## 🎨 Padrões de Design

### Frontend

**Component Pattern:**
- Componentes funcionais com hooks
- Props tipadas com TypeScript
- Composição sobre herança

**State Management:**
- Context API para estado global (auth)
- React Query para estado servidor (cache, sincronização)
- useState/useReducer para estado local

**Routing:**
- React Router DOM v6
- Rotas protegidas com HOC/wrapper
- Lazy loading de páginas

### Backend

**MVC Pattern:**
- Models: Mongoose schemas
- Views: JSON responses
- Controllers: Lógica de negócio nas rotas

**Middleware Pattern:**
- Autenticação JWT
- Validação de dados
- Tratamento de erros

**Repository Pattern:**
- Mongoose como ORM
- Abstração de acesso a dados

## 🔒 Segurança

**Frontend:**
- Validação de formulários (zod + react-hook-form)
- Sanitização de inputs
- HTTPS em produção
- Tokens armazenados de forma segura

**Backend:**
- Senhas hasheadas com bcryptjs (salt rounds: 10)
- JWT com expiração configurável
- CORS configurado
- express-validator para validação
- Rate limiting (recomendado para produção)
- Helmet.js (recomendado para produção)

**Banco de Dados:**
- Conexão via URI com credenciais
- Índices únicos (email)
- Validações no schema

## 📦 Dependências Principais

### Frontend
```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "@tanstack/react-query": "^5.83.0",
  "lucide-react": "^0.462.0",
  "tailwindcss": "^3.4.17",
  "framer-motion": "^11.18.2",
  "zod": "^3.25.76",
  "react-hook-form": "^7.61.1"
}
```

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express-validator": "^7.0.1"
}
```

## 🚀 Deploy

**Frontend:**
- Build: `npm run build`
- Output: `dist/`
- Hospedagem: Vercel, Netlify, ou similar
- Variáveis de ambiente: `VITE_API_URL`

**Backend:**
- Start: `npm start`
- Hospedagem: Railway, Render, Heroku, ou VPS
- Variáveis de ambiente:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `PORT`
  - `FRONTEND_URL`
  - `NODE_ENV`

**Banco de Dados:**
- MongoDB Atlas (cloud)
- Backup automático
- Réplicas para alta disponibilidade

## 📈 Escalabilidade

**Horizontal:**
- Frontend: CDN para assets estáticos
- Backend: Load balancer + múltiplas instâncias
- Database: MongoDB sharding

**Vertical:**
- Otimização de queries
- Índices no banco
- Cache com Redis (futuro)
- Compressão de respostas

## 🔄 Melhorias Futuras

1. **Cache Layer:** Redis para sessões e dados frequentes
2. **File Storage:** AWS S3 para PDFs das apostilas
3. **Payment Gateway:** Integração com Stripe/PagSeguro
4. **Email Service:** SendGrid para notificações
5. **Analytics:** Google Analytics ou Mixpanel
6. **Monitoring:** Sentry para error tracking
7. **CI/CD:** GitHub Actions para deploy automático
8. **Tests:** Jest + React Testing Library + Supertest
9. **Documentation:** Swagger/OpenAPI para API docs
10. **WebSockets:** Para notificações em tempo real