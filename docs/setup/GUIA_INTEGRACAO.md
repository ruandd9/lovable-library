# 🔗 Guia de Integração Frontend + Backend

Este guia mostra como conectar o frontend React ao backend Node.js.

## 📦 Estrutura Criada

```
projeto/
├── frontend/              # Seu projeto React atual
│   ├── src/
│   │   ├── services/
│   │   │   └── api.ts    # ✨ NOVO - Cliente API
│   │   └── ...
│   └── .env.example      # ✨ NOVO - Variáveis de ambiente
│
└── backend/              # ✨ NOVO - API Node.js
    ├── src/
    │   ├── models/       # Modelos do MongoDB
    │   ├── routes/       # Rotas da API
    │   ├── middleware/   # Autenticação
    │   ├── config/       # Configuração DB
    │   ├── scripts/      # Scripts utilitários
    │   └── server.js     # Servidor principal
    ├── .env.example
    └── package.json
```

## 🚀 Passo a Passo para Rodar

### 1. Configurar e Rodar o Backend

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env

# Editar .env com suas configurações
# (use um editor de texto)

# Popular banco de dados com apostilas de exemplo
node src/scripts/seedApostilas.js

# Iniciar servidor
npm run dev
```

O backend estará rodando em: `http://localhost:3001`

### 2. Configurar o Frontend

```bash
# Voltar para a raiz do projeto
cd ..

# Criar arquivo .env na raiz do frontend
cp .env.example .env
```

Edite o arquivo `.env`:
```env
VITE_API_URL=http://localhost:3001/api
```

### 3. Instalar axios no Frontend

```bash
npm install axios
```

### 4. Atualizar AuthContext para usar API real

Abra `src/contexts/AuthContext.tsx` e substitua as chamadas mock pelas chamadas reais da API.

**Exemplo de como ficaria o método login:**

```typescript
import { authAPI } from '@/services/api';

const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const response = await authAPI.login(email, password);
    
    if (response.data.success) {
      const { token, ...userData } = response.data.data;
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      
      setUser(userData);
      setToken(token);
      setIsLoading(false);
      return { success: true };
    }
    
    return { success: false, error: 'Erro ao fazer login' };
  } catch (error: any) {
    setIsLoading(false);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Erro ao conectar com o servidor' 
    };
  }
};
```

### 5. Atualizar páginas para usar API

**Exemplo - Página de Catálogo:**

```typescript
import { useQuery } from '@tanstack/react-query';
import { apostilasAPI } from '@/services/api';

const Catalogo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['apostilas'],
    queryFn: async () => {
      const response = await apostilasAPI.getAll();
      return response.data.data;
    }
  });

  // Usar data ao invés de dados mockados
};
```

### 6. Rodar o Frontend

```bash
npm run dev
```

O frontend estará em: `http://localhost:5173`

## 🔄 Fluxo de Autenticação

1. Usuário faz login no frontend
2. Frontend envia credenciais para `POST /api/auth/login`
3. Backend valida e retorna JWT token
4. Frontend salva token no localStorage
5. Todas as requisições subsequentes incluem o token no header
6. Backend valida token em rotas protegidas

## 📝 Exemplo de Uso Completo

### Registrar novo usuário

```typescript
import { authAPI } from '@/services/api';

const handleRegister = async () => {
  try {
    const response = await authAPI.register(name, email, password);
    if (response.data.success) {
      // Salvar token e redirecionar
      localStorage.setItem('auth_token', response.data.data.token);
      navigate('/dashboard');
    }
  } catch (error) {
    console.error('Erro ao registrar:', error);
  }
};
```

### Comprar apostila

```typescript
import { purchasesAPI } from '@/services/api';

const handlePurchase = async (apostilaId: string) => {
  try {
    const response = await purchasesAPI.create(apostilaId, 'credit_card');
    if (response.data.success) {
      toast.success('Compra realizada com sucesso!');
      // Atualizar lista de apostilas compradas
    }
  } catch (error) {
    toast.error('Erro ao processar compra');
  }
};
```

### Listar apostilas compradas

```typescript
import { purchasesAPI } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const { data: purchases } = useQuery({
    queryKey: ['purchases'],
    queryFn: async () => {
      const response = await purchasesAPI.getUserPurchases();
      return response.data.data;
    }
  });

  return (
    <div>
      {purchases?.map(purchase => (
        <div key={purchase._id}>
          <h3>{purchase.apostila.title}</h3>
          <p>Comprado em: {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};
```

## 🐛 Problemas Comuns

### CORS Error
**Problema:** Erro de CORS ao fazer requisições

**Solução:** Verifique se o `FRONTEND_URL` no `.env` do backend está correto:
```env
FRONTEND_URL=http://localhost:5173
```

### Token Inválido
**Problema:** Erro 401 Unauthorized

**Solução:** 
- Faça login novamente
- Verifique se o JWT_SECRET é o mesmo no backend
- Limpe localStorage: `localStorage.clear()`

### MongoDB não conecta
**Problema:** Erro ao conectar com MongoDB

**Solução:**
- Verifique se MongoDB está rodando: `mongod`
- Ou use MongoDB Atlas (cloud gratuito)
- Confirme MONGODB_URI no `.env`

### Porta em uso
**Problema:** Porta 3001 já está em uso

**Solução:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

## 🎯 Próximos Passos

1. ✅ Backend funcionando
2. ✅ Frontend conectado
3. 🔄 Atualizar AuthContext
4. 🔄 Atualizar páginas para usar API
5. 🔄 Testar fluxo completo
6. 🚀 Deploy (Vercel + Railway/Render)

## 📚 Recursos Úteis

- [Documentação Express](https://expressjs.com/)
- [Documentação MongoDB](https://www.mongodb.com/docs/)
- [Documentação Mongoose](https://mongoosejs.com/)
- [Documentação Axios](https://axios-http.com/)
- [JWT.io](https://jwt.io/) - Decodificar tokens

## 💡 Dicas

- Use MongoDB Compass para visualizar dados
- Use Thunder Client (VS Code) para testar API
- Mantenha o backend e frontend rodando em terminais separados
- Sempre valide dados no backend, nunca confie apenas no frontend
- Use variáveis de ambiente para configurações sensíveis
