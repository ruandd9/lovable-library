# ✅ Checklist de Setup

## Status Atual

- [x] Dependências do frontend instaladas
- [x] Dependências do backend instaladas
- [x] Arquivos .env criados
- [x] AuthContext integrado com API real
- [ ] MongoDB configurado
- [ ] Banco populado com seed
- [ ] Backend rodando
- [ ] Frontend rodando
- [ ] Teste de cadastro funcionando
- [ ] Teste de login funcionando
- [ ] Teste de compra funcionando

## Próximos Passos

### 1. Configurar MongoDB

**Escolha uma opção:**

#### Opção A: MongoDB Atlas (Recomendado - Grátis)
1. Acesse: https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster M0 (gratuito)
4. Crie um usuário do banco de dados
5. Configure Network Access (adicione seu IP ou 0.0.0.0/0)
6. Copie a connection string
7. Cole no arquivo `backend/.env` na variável `MONGODB_URI`

Exemplo:
```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/apostilas
```

#### Opção B: MongoDB Local
1. Baixe: https://www.mongodb.com/try/download/community
2. Instale e inicie o serviço
3. O `backend/.env` já está configurado para localhost

#### Opção C: MongoDB via Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### 2. Popular o Banco de Dados

```bash
cd backend
node src/scripts/seedApostilas.js
```

### 3. Iniciar Backend

**Terminal 1:**
```bash
cd backend
npm run dev
```

Aguarde ver:
```
🚀 Servidor rodando na porta 3001
✅ MongoDB conectado com sucesso
```

### 4. Iniciar Frontend

**Terminal 2 (nova janela):**
```bash
npm run dev
```

Aguarde ver:
```
➜  Local:   http://localhost:5173/
```

### 5. Testar a Aplicação

1. Abra http://localhost:5173
2. Clique em "Cadastro"
3. Preencha os dados:
   - Nome: Seu Nome
   - Email: seu@email.com
   - Senha: 123456
4. Clique em "Criar Conta"
5. Você será redirecionado para o dashboard
6. Navegue até "Catálogo"
7. Clique em uma apostila
8. Clique em "Comprar Apostila"
9. Confirme a compra
10. Volte ao Dashboard e veja a apostila em "Minhas Apostilas"

## 🐛 Problemas Comuns

### Backend não inicia
- Verifique se MongoDB está rodando
- Verifique o arquivo `backend/.env`
- Veja os logs de erro no terminal

### Frontend não conecta
- Verifique se backend está na porta 3001
- Verifique o arquivo `.env` na raiz
- Abra DevTools (F12) > Console para ver erros

### Erro de CORS
- Verifique `FRONTEND_URL` em `backend/.env`
- Deve ser: `http://localhost:5173`

### Erro ao fazer login
- Verifique se o usuário foi criado no banco
- Limpe o localStorage: F12 > Console > `localStorage.clear()`
- Tente criar uma nova conta

## 📞 Comandos Úteis

```bash
# Ver logs do MongoDB (se local)
mongosh

# Limpar banco de dados
mongosh
use apostilas
db.dropDatabase()

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Ver processos rodando nas portas
netstat -ano | findstr :3001
netstat -ano | findstr :5173
```

## 🎉 Tudo Funcionando?

Se todos os testes passaram, você está pronto para:
- Personalizar as apostilas
- Adicionar novas funcionalidades
- Fazer deploy em produção

Consulte os outros documentos:
- [SETUP_RAPIDO.md](./SETUP_RAPIDO.md)
- [ARQUITETURA.md](./ARQUITETURA.md)
- [COMANDOS_RAPIDOS.md](./COMANDOS_RAPIDOS.md)
