# ⚡ Comandos Rápidos

Referência rápida de comandos para desenvolvimento.

## 🚀 Iniciar Projeto

### Primeira vez (Setup completo)

```bash
# 1. Backend
cd backend
npm install
copy .env.example .env
# Edite o .env com suas configurações
node src/scripts/seedApostilas.js
npm run dev

# 2. Frontend (em outro terminal)
cd ..
npm install axios
copy .env.example .env
# Edite o .env: VITE_API_URL=http://localhost:3001/api
npm run dev
```

### Dias seguintes (Já configurado)

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

## 📦 Instalação

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
npm install
npm install axios  # Se ainda não instalou
```

## 🗄️ Banco de Dados

### Popular com dados de exemplo
```bash
cd backend
node src/scripts/seedApostilas.js
```

### Limpar banco de dados
```bash
# Conectar ao MongoDB
mongosh

# Usar database
use apostilas

# Limpar collections
db.apostilas.deleteMany({})
db.users.deleteMany({})
db.purchases.deleteMany({})

# Sair
exit
```

### Verificar dados
```bash
mongosh
use apostilas
db.apostilas.find()
db.users.find()
db.purchases.find()
```

## 🔧 Desenvolvimento

### Backend
```bash
cd backend
npm run dev      # Desenvolvimento com nodemon
npm start        # Produção
```

### Frontend
```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build
npm run lint     # Verificar erros
```

## 🧪 Testar API

### Com curl (terminal)

```bash
# Registrar usuário
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Teste\",\"email\":\"teste@email.com\",\"password\":\"123456\"}"

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"teste@email.com\",\"password\":\"123456\"}"

# Listar apostilas
curl http://localhost:3001/api/apostilas
```

### Com PowerShell (Windows)

```powershell
# Registrar usuário
Invoke-RestMethod -Uri "http://localhost:3001/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"Teste","email":"teste@email.com","password":"123456"}'

# Login
Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"teste@email.com","password":"123456"}'

# Listar apostilas
Invoke-RestMethod -Uri "http://localhost:3001/api/apostilas"
```

## 🐛 Debug

### Ver logs do backend
```bash
cd backend
npm run dev
# Logs aparecem no terminal
```

### Ver logs do frontend
```bash
# Abrir DevTools no navegador (F12)
# Aba Console
```

### Limpar cache do navegador
```
Ctrl + Shift + Delete (Chrome/Edge)
Cmd + Shift + Delete (Mac)
```

### Limpar localStorage
```javascript
// No console do navegador (F12)
localStorage.clear()
location.reload()
```

## 🔄 Reiniciar Serviços

### MongoDB (se parou)

**Windows:**
```bash
net start MongoDB
```

**Linux:**
```bash
sudo systemctl start mongodb
```

**Mac:**
```bash
brew services start mongodb-community
```

### Matar processo em porta específica

**Windows:**
```bash
# Encontrar PID
netstat -ano | findstr :3001

# Matar processo
taskkill /PID <numero> /F
```

**Linux/Mac:**
```bash
# Matar processo na porta 3001
lsof -ti:3001 | xargs kill -9

# Ou
npx kill-port 3001
```

## 📝 Git

### Commit inicial
```bash
git add .
git commit -m "feat: adiciona backend com MongoDB e integração API"
git push
```

### Ignorar .env
```bash
# Já está no .gitignore
# Nunca commite arquivos .env!
```

## 🚀 Deploy

### Backend (Railway)
```bash
# 1. Criar conta em railway.app
# 2. Instalar CLI
npm i -g @railway/cli

# 3. Login
railway login

# 4. Deploy
cd backend
railway init
railway up
```

### Frontend (Vercel)
```bash
# 1. Instalar CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Configurar variável de ambiente
# No dashboard: Settings > Environment Variables
# VITE_API_URL = sua_url_do_backend
```

## 🔐 Segurança

### Gerar JWT Secret seguro
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# OpenSSL
openssl rand -hex 64
```

### Trocar senha do MongoDB Atlas
```bash
# 1. Acesse mongodb.com/cloud/atlas
# 2. Database Access
# 3. Edit User
# 4. Change Password
# 5. Atualize MONGODB_URI no .env
```

## 📊 Monitoramento

### Ver conexões MongoDB
```bash
mongosh
db.serverStatus().connections
```

### Ver uso de memória
```bash
# Node.js
node --max-old-space-size=4096 src/server.js
```

## 🧹 Limpeza

### Remover node_modules
```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Frontend
cd ..
rm -rf node_modules
npm install
```

### Limpar build
```bash
rm -rf dist
npm run build
```

## 📱 Atalhos Úteis

### VS Code
- `Ctrl + `` - Abrir terminal
- `Ctrl + Shift + P` - Command Palette
- `Ctrl + P` - Buscar arquivo
- `F5` - Debug

### Chrome DevTools
- `F12` - Abrir DevTools
- `Ctrl + Shift + C` - Inspecionar elemento
- `Ctrl + Shift + J` - Console
- `Ctrl + Shift + I` - DevTools

## 🎯 Checklist Diário

Antes de começar a trabalhar:
- [ ] MongoDB rodando
- [ ] Backend rodando (porta 3001)
- [ ] Frontend rodando (porta 5173)
- [ ] .env configurado
- [ ] Git atualizado

## 💡 Dicas

1. **Sempre rode backend antes do frontend**
2. **Use 2 terminais separados**
3. **Verifique logs quando algo der errado**
4. **Nunca commite arquivos .env**
5. **Faça backup do banco regularmente**

## 🆘 Problemas Comuns

### "Cannot find module"
```bash
npm install
```

### "Port already in use"
```bash
npx kill-port 3001
npx kill-port 5173
```

### "MongoDB connection failed"
```bash
# Verificar se está rodando
mongosh

# Se não estiver, iniciar
# Windows: net start MongoDB
# Linux: sudo systemctl start mongodb
# Mac: brew services start mongodb-community
```

### "CORS error"
```bash
# Verificar FRONTEND_URL no backend/.env
# Deve ser: http://localhost:5173
```

### "Token invalid"
```javascript
// No console do navegador
localStorage.clear()
location.reload()
```

---

**Salve este arquivo para referência rápida! 📌**
