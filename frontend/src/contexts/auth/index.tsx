import React, { createContext, useContext, useEffect, useState } from 'react';
import { serverClient } from '../../adapter/http/server.client';
import { User } from '../../domain/models/user.models';
import { useLoading } from '../loading';

interface AuthContextType {
  user: User | null;
  token: string | null;
  error: string | null;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

const fetchUser = async (): Promise<User> => {
  const response = await serverClient.get('api/me');
  return response;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const loading = useLoading();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      loading.showLoading();
      try {
        const userData = await fetchUser();
        setUser(userData);
        setError(null);
      } catch (err: any) {
        setUser(null);
        setError(err.message);
      } finally {
        loading.hideLoading();
      }
    };

    fetchUserData();
  }, []);

  const refreshUser = async () => {
    try {
      const userData = await fetchUser();
      setUser(userData); 
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token: null, error, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
