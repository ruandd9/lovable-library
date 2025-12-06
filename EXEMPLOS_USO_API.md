# 📖 Exemplos de Uso da API

Este arquivo contém exemplos práticos de como usar a API nas páginas do frontend.

## 🔐 Autenticação

### Página de Login

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta!",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Erro ao fazer login",
        description: result.error || "Verifique suas credenciais",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};
```

### Página de Cadastro

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Cadastro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await register(name, email, password);

    if (result.success) {
      toast({
        title: "Conta criada!",
        description: "Bem-vindo à plataforma!",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Erro ao criar conta",
        description: result.error || "Tente novamente",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome completo"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha (mínimo 6 caracteres)"
        required
        minLength={6}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Criando conta...' : 'Cadastrar'}
      </button>
    </form>
  );
};
```

## 📚 Apostilas

### Página de Catálogo

```typescript
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apostilasAPI } from '@/services/api';
import ApostilaCard from '@/components/ApostilaCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const Catalogo = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['apostilas', selectedCategory, searchTerm],
    queryFn: async () => {
      const params: any = {};
      if (selectedCategory !== 'Todos') {
        params.category = selectedCategory;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }
      const response = await apostilasAPI.getAll(params);
      return response.data.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Erro ao carregar apostilas</p>
        <button onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar apostilas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded"
        />
      </div>

      <div className="flex gap-4 mb-8">
        {['Todos', 'Concursos', 'Vestibulares', 'Direito', 'ENEM'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((apostila: any) => (
          <ApostilaCard key={apostila._id} apostila={apostila} />
        ))}
      </div>

      {data?.length === 0 && (
        <p className="text-center py-12 text-gray-500">
          Nenhuma apostila encontrada
        </p>
      )}
    </div>
  );
};
```

### Página de Detalhes da Apostila

```typescript
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apostilasAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

const ApostilaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, purchaseApostila, hasPurchased } = useAuth();
  const { toast } = useToast();

  const { data: apostila, isLoading } = useQuery({
    queryKey: ['apostila', id],
    queryFn: async () => {
      const response = await apostilasAPI.getById(id!);
      return response.data.data;
    },
    enabled: !!id,
  });

  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para comprar apostilas",
      });
      navigate('/login');
      return;
    }

    if (hasPurchased(id!)) {
      toast({
        title: "Você já possui esta apostila",
        description: "Acesse no seu dashboard",
      });
      navigate('/dashboard');
      return;
    }

    const result = await purchaseApostila(id!);

    if (result.success) {
      toast({
        title: "Compra realizada!",
        description: "Apostila adicionada à sua biblioteca",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Erro ao processar compra",
        description: result.error || "Tente novamente",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!apostila) return <div>Apostila não encontrada</div>;

  const isPurchased = hasPurchased(id!);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={apostila.cover} alt={apostila.title} className="w-full h-64 object-cover rounded" />
      
      <h1 className="text-3xl font-bold mt-6">{apostila.title}</h1>
      <p className="text-gray-600 mt-2">{apostila.description}</p>
      
      <div className="mt-6">
        <p className="text-2xl font-bold text-primary">
          R$ {apostila.price.toFixed(2)}
        </p>
        {apostila.originalPrice && (
          <p className="text-gray-500 line-through">
            R$ {apostila.originalPrice.toFixed(2)}
          </p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Características</h2>
        <ul className="space-y-2">
          <li>📄 {apostila.pages} páginas</li>
          <li>⭐ {apostila.rating} ({apostila.reviews} avaliações)</li>
          <li>👨‍🏫 {apostila.author}</li>
          <li>📅 Atualizado em {apostila.lastUpdate}</li>
          <li>🎯 Nível: {apostila.level}</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">O que você vai aprender</h2>
        <ul className="grid grid-cols-2 gap-2">
          {apostila.topics?.map((topic: string, index: number) => (
            <li key={index} className="flex items-center">
              ✓ {topic}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handlePurchase}
        disabled={isPurchased}
        className="w-full mt-8 py-3 bg-primary text-white rounded font-semibold"
      >
        {isPurchased ? 'Já adquirida' : 'Comprar agora'}
      </button>
    </div>
  );
};
```

## 📊 Dashboard

### Página do Dashboard

```typescript
import { useQuery } from '@tanstack/react-query';
import { purchasesAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data: purchases, isLoading } = useQuery({
    queryKey: ['user-purchases'],
    queryFn: async () => {
      const response = await purchasesAPI.getUserPurchases();
      return response.data.data;
    },
    enabled: !!user,
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Olá, {user.name}!</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <button onClick={logout} className="px-4 py-2 border rounded">
          Sair
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Minhas Apostilas</h2>
        
        {purchases?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded">
            <p className="text-gray-500 mb-4">Você ainda não possui apostilas</p>
            <button
              onClick={() => navigate('/catalogo')}
              className="px-6 py-2 bg-primary text-white rounded"
            >
              Ver Catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases?.map((purchase: any) => (
              <div key={purchase._id} className="border rounded p-4">
                <img
                  src={purchase.apostila.cover}
                  alt={purchase.apostila.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="font-semibold">{purchase.apostila.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Comprado em: {new Date(purchase.purchaseDate).toLocaleDateString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">
                  Valor: R$ {purchase.price.toFixed(2)}
                </p>
                <button
                  onClick={() => navigate(`/apostila/${purchase.apostila._id}`)}
                  className="w-full mt-3 py-2 bg-primary text-white rounded"
                >
                  Acessar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-6 rounded">
        <h3 className="font-semibold mb-2">Estatísticas</h3>
        <p>Total de apostilas: {purchases?.length || 0}</p>
        <p>Total investido: R$ {purchases?.reduce((sum: number, p: any) => sum + p.price, 0).toFixed(2) || '0.00'}</p>
      </div>
    </div>
  );
};
```

## 🛡️ Rota Protegida

### Componente ProtectedRoute

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

### Uso no App.tsx

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/login" element={<Login />} />
  <Route path="/cadastro" element={<Cadastro />} />
  <Route path="/catalogo" element={<Catalogo />} />
  <Route path="/apostila/:id" element={<ApostilaDetails />} />
  
  {/* Rotas protegidas */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  
  <Route path="*" element={<NotFound />} />
</Routes>
```

## 🔄 Invalidação de Cache

### Após compra, atualizar lista

```typescript
import { useQueryClient } from '@tanstack/react-query';

const Component = () => {
  const queryClient = useQueryClient();

  const handlePurchase = async (apostilaId: string) => {
    const result = await purchaseApostila(apostilaId);
    
    if (result.success) {
      // Invalidar cache para recarregar dados
      queryClient.invalidateQueries({ queryKey: ['user-purchases'] });
      queryClient.invalidateQueries({ queryKey: ['apostila', apostilaId] });
    }
  };
};
```

## 🎨 Loading States

### Skeleton Loading

```typescript
const Catalogo = () => {
  const { data, isLoading } = useQuery({...});

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded mb-3"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return <div>{/* conteúdo real */}</div>;
};
```

Esses exemplos cobrem os principais casos de uso da API! 🚀
