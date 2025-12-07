# 🚀 Setup Rápido - Guia Completo

## ⚡ Instalação Rápida (5 minutos)

### Pré-requisitos
- ✅ Node.js 18+ instalado
- ✅ MongoDB instalado OU conta MongoDB Atlas

### Opção 1: MongoDB Local

**Windows:**
1. Baixe: https://www.mongodb.com/try/download/community
2. Instale com configurações padrão
3. MongoDB rodará automaticamente

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Opção 2: MongoDB Atlas (Cloud - Grátis)

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie conta gratuita
3. Crie um cluster (Free Tier)
4. Em "Database Access", crie um usuário
5. Em "Network Access", adicione `0.0.0.0/0` (permite qualquer IP)
6. Clique em "Connect" > "Connect your application"
7. Copie a connection string

## 📦 Instalação

### 1. Backend

```bash
# Entrar na pasta
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
copy .env.example .env    # Windows
# ou
cp .env.example .env      # Linux/Mac
```

**Edite o arquivo `backend/.env`:**

Para MongoDB Local:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/apostilas
JWT_SECRET=mude_isso_para_algo_super_seguro_123456
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Para MongoDB Atlas:
```env
PORT=3001
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/apostilas?retryWrites=true&w=majority
JWT_SECRET=mude_isso_para_algo_super_seguro_123456
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Popular banco com dados de exemplo:**
```bash
node src/scripts/seedApostilas.js
```

**Iniciar servidor:**
```bash
npm run dev
```

✅ Backend rodando em: http://localhost:3001

### 2. Frontend

```bash
# Voltar para raiz do projeto
cd ..

# Instalar axios
npm install axios

# Criar arquivo .env
copy .env.example .env    # Windows
# ou
cp .env.example .env      # Linux/Mac
```

**Edite o arquivo `.env` na raiz:**
```env
VITE_API_URL=http://localhost:3001/api
```

**Iniciar frontend:**
```bash
npm run dev
```

✅ Frontend rodando em: http://localhost:5173

## 🧪 Testar

1. Abra http://localhost:5173
2. Vá para "Cadastro"
3. Crie uma conta
4. Faça login
5. Navegue pelo catálogo
6. Teste uma compra

## 📋 Checklist

- [ ] Node.js instalado
- [ ] MongoDB rodando (local ou Atlas)
- [ ] Backend: dependências instaladas
- [ ] Backend: arquivo .env configurado
- [ ] Backend: banco populado com seed
- [ ] Backend: servidor rodando na porta 3001
- [ ] Frontend: axios instalado
- [ ] Frontend: arquivo .env configurado
- [ ] Frontend: servidor rodando na porta 5173
- [ ] Teste: cadastro funcionando
- [ ] Teste: login funcionando
- [ ] Teste: catálogo carregando

## 🔧 Comandos Úteis

### Backend
```bash
cd backend
npm run dev          # Rodar em desenvolvimento
npm start            # Rodar em produção
node src/scripts/seedApostilas.js  # Popular banco
```

### Frontend
```bash
npm run dev          # Rodar em desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build
```

## 🐛 Solução de Problemas

### "Cannot connect to MongoDB"
- Verifique se MongoDB está rodando
- Teste a conexão: `mongosh` (deve abrir shell do MongoDB)
- Verifique a URI no .env

### "Port 3001 already in use"
- Mude a porta no backend/.env
- Ou mate o processo:
  ```bash
  # Windows
  netstat -ano | findstr :3001
  taskkill /PID <numero> /F
  
  # Linux/Mac
  lsof -ti:3001 | xargs kill -9
  ```

### "CORS Error"
- Verifique FRONTEND_URL no backend/.env
- Deve ser exatamente: http://localhost:5173

### "Module not found"
- Delete node_modules e reinstale:
  ```bash
  rm -rf node_modules
  npm install
  ```

## 📱 Testando a API

Use Postman, Insomnia ou Thunder Client:

**Registrar:**
```http
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "name": "Teste",
  "email": "teste@email.com",
  "password": "123456"
}
```

**Login:**
```http
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "teste@email.com",
  "password": "123456"
}
```

**Listar Apostilas:**
```http
GET http://localhost:3001/api/apostilas
```

## 🎯 Próximos Passos

Depois que tudo estiver funcionando:

1. Leia o `GUIA_INTEGRACAO.md` para entender a integração
2. Atualize `src/contexts/AuthContext.tsx` para usar API real
3. Atualize páginas para buscar dados da API
4. Implemente sistema de compras real
5. Adicione tratamento de erros
6. Prepare para deploy

## 📚 Documentação

- README.md - Documentação do frontend
- backend/README.md - Documentação do backend
- GUIA_INTEGRACAO.md - Como integrar frontend e backend

## 💬 Precisa de Ajuda?

Verifique os logs:
- Backend: Terminal onde rodou `npm run dev`
- Frontend: Console do navegador (F12)
- MongoDB: `mongosh` para acessar shell

Boa sorte! 🚀
