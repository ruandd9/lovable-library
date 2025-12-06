# 🚀 Setup Rápido

## Pré-requisitos

- Node.js 18+ instalado
- MongoDB rodando (local ou Atlas)
- npm ou yarn

## 1️⃣ Configurar Variáveis de Ambiente

### Frontend (raiz do projeto)
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env se necessário (já está configurado para localhost)
```

### Backend
```bash
# Copiar arquivo de exemplo
cp backend/.env.example backend/.env

# Editar backend/.env e configurar:
# - MONGODB_URI (se usar Atlas, cole a connection string aqui)
# - JWT_SECRET (gere um secret seguro)
```

## 2️⃣ Instalar Dependências

```bash
# Frontend (raiz)
npm install

# Backend
cd backend
npm install
cd ..
```

## 3️⃣ Configurar MongoDB

### Opção A: MongoDB Local
```bash
# Instalar MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Ou via Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### Opção B: MongoDB Atlas (Recomendado)
1. Criar conta em https://www.mongodb.com/cloud/atlas
2. Criar cluster gratuito (M0)
3. Criar usuário do banco
4. Whitelist seu IP (ou 0.0.0.0/0 para desenvolvimento)
5. Copiar connection string
6. Colar no `backend/.env` em `MONGODB_URI`

Exemplo:
```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/apostilas?retryWrites=true&w=majority
```

## 4️⃣ Popular o Banco (Seed)

```bash
cd backend
node src/scripts/seedApostilas.js
cd ..
```

## 5️⃣ Iniciar os Servidores

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Deve aparecer:
```
🚀 Servidor rodando na porta 3001
📍 Ambiente: development
✅ MongoDB conectado com sucesso
```

### Terminal 2 - Frontend
```bash
npm run dev
```

Deve aparecer:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## 6️⃣ Testar a Aplicação

1. Abrir http://localhost:5173
2. Clicar em "Cadastro"
3. Criar uma conta
4. Fazer login
5. Navegar pelo catálogo
6. Comprar uma apostila

## 🔧 Troubleshooting

### Backend não conecta ao MongoDB
- Verificar se MongoDB está rodando: `mongosh` (local) ou testar connection string (Atlas)
- Verificar `MONGODB_URI` no `backend/.env`
- Verificar firewall/whitelist no Atlas

### Frontend não conecta ao Backend
- Verificar se backend está rodando na porta 3001
- Verificar `VITE_API_URL` no `.env` da raiz
- Abrir DevTools > Network para ver erros

### Erro de CORS
- Verificar `FRONTEND_URL` no `backend/.env`
- Deve ser `http://localhost:5173`

### Token inválido após login
- Verificar `JWT_SECRET` no `backend/.env`
- Limpar localStorage: `localStorage.clear()` no console do navegador

## 📝 Credenciais de Teste

Após o seed, você pode criar sua própria conta ou usar:
- Email: qualquer email válido
- Senha: mínimo 6 caracteres

## 🎯 Próximos Passos

- [ ] Testar todas as funcionalidades
- [ ] Personalizar apostilas no seed
- [ ] Adicionar mais categorias
- [ ] Implementar sistema de pagamento real
- [ ] Deploy em produção

## 📚 Documentação Completa

- [ARQUITETURA.md](./ARQUITETURA.md) - Arquitetura do sistema
- [COMANDOS_RAPIDOS.md](./COMANDOS_RAPIDOS.md) - Comandos úteis
- [GUIA_INTEGRACAO.md](./GUIA_INTEGRACAO.md) - Guia de integração
- [EXEMPLOS_USO_API.md](./EXEMPLOS_USO_API.md) - Exemplos de uso da API
