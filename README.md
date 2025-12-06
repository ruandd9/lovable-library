# 📚 Plataforma de Apostilas Online

Uma plataforma moderna e interativa para venda de apostilas digitais, desenvolvida com React, TypeScript e design responsivo.

## 🚀 Sobre o Projeto

Esta aplicação é uma loja virtual completa para apostilas educacionais, oferecendo:

- **Catálogo de Apostilas**: Navegação por categorias (Concursos, Vestibulares, Direito, ENEM)
- **Sistema de Autenticação**: Login e cadastro de usuários
- **Dashboard Personalizado**: Área do usuário com apostilas compradas
- **Detalhes dos Produtos**: Páginas individuais com informações completas
- **Carrinho de Compras**: Sistema de compra integrado
- **Design Moderno**: Interface com animações 3D e efeitos visuais

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **TanStack Query** - Gerenciamento de estado assíncrono
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI reutilizáveis
- **Framer Motion** - Animações
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **React Hook Form + Zod** - Validação de formulários

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** - Gerenciador de pacotes (vem com Node.js)

## 🔧 Instalação e Execução

### 1. Clone o repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

### 2. Instale as dependências

```bash
npm install
```

ou se preferir usar yarn:

```bash
yarn install
```

### 3. Execute o projeto em modo de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:5173`

### 4. Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### 5. Preview da build de produção

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── assets/          # Imagens e recursos estáticos
│   └── covers/      # Capas das apostilas
├── components/      # Componentes React reutilizáveis
│   ├── ui/          # Componentes UI do shadcn
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ApostilaCard.tsx
│   └── ...
├── contexts/        # Contextos React (AuthContext)
├── data/            # Dados mockados (apostilas)
├── hooks/           # Custom hooks
├── lib/             # Utilitários
├── pages/           # Páginas da aplicação
│   ├── Index.tsx
│   ├── Login.tsx
│   ├── Cadastro.tsx
│   ├── Catalogo.tsx
│   ├── Dashboard.tsx
│   └── ApostilaDetails.tsx
├── App.tsx          # Componente principal
└── main.tsx         # Entry point
```

## 🎯 Funcionalidades Principais

### Autenticação (Mock)
- Login com email e senha
- Cadastro de novos usuários
- Persistência com localStorage
- Proteção de rotas

**Credenciais de teste:**
- Email: `teste@email.com`
- Senha: `123456`

### Catálogo
- Listagem de apostilas por categoria
- Filtros e busca
- Cards com informações e preços
- Avaliações e reviews

### Dashboard do Usuário
- Visualização de apostilas compradas
- Acesso aos materiais
- Informações do perfil

## 🔄 Próximos Passos: Backend

Para conectar este frontend a um backend real, você precisará:

### Opção 1: Backend com Node.js + Express + MongoDB

**Estrutura recomendada:**
```
backend/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   ├── Apostila.js
│   │   └── Purchase.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── apostilas.js
│   │   └── purchases.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── database.js
│   └── server.js
├── .env
└── package.json
```

**Tecnologias:**
- Express.js (servidor)
- MongoDB + Mongoose (banco de dados)
- JWT (autenticação)
- bcrypt (hash de senhas)
- cors (CORS)

### Opção 2: Backend com Node.js + Prisma + PostgreSQL

**Vantagens:**
- Type-safe
- Migrations automáticas
- Melhor para dados relacionais

### Endpoints necessários:

**Autenticação:**
- `POST /api/auth/register` - Cadastro
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário

**Apostilas:**
- `GET /api/apostilas` - Listar todas
- `GET /api/apostilas/:id` - Detalhes
- `GET /api/apostilas/category/:category` - Por categoria

**Compras:**
- `POST /api/purchases` - Realizar compra
- `GET /api/purchases/user/:userId` - Compras do usuário

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/apostilas
JWT_SECRET=seu_secret_super_seguro
NODE_ENV=development
```

## 📝 Alterações Necessárias no Frontend

Após criar o backend, você precisará:

1. Criar um arquivo `src/services/api.ts` com axios
2. Atualizar `AuthContext.tsx` para fazer chamadas reais
3. Adicionar variável de ambiente `VITE_API_URL`
4. Implementar tratamento de erros
5. Adicionar loading states

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ usando React e TypeScript
