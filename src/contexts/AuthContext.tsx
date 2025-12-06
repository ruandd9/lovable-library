import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  purchasedApostilas: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  purchaseApostila: (apostilaId: string) => void;
  hasPurchased: (apostilaId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Simulating API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email === 'teste@email.com' && password === '123456') {
        const mockUser: User = {
          id: '1',
          name: 'Usuário Teste',
          email: email,
          purchasedApostilas: ['1', '3'],
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setToken(mockToken);
        setIsLoading(false);
        return { success: true };
      }
      
      setIsLoading(false);
      return { success: false, error: 'Email ou senha incorretos' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        purchasedApostilas: [],
      };
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      setToken(mockToken);
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Erro ao criar conta' };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    setToken(null);
  };

  const purchaseApostila = (apostilaId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        purchasedApostilas: [...user.purchasedApostilas, apostilaId],
      };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  const hasPurchased = (apostilaId: string): boolean => {
    return user?.purchasedApostilas.includes(apostilaId) || false;
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, purchaseApostila, hasPurchased }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
