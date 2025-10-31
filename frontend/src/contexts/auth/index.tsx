import React, { createContext, useContext, useEffect, useState } from 'react';
import { HttpClient } from '../../adapter/http/http.client';
import { serverClient } from '../../adapter/http/server.client';
import { User } from '../../domain/models/user.models';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
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
  const response = await serverClient.get('/api/me');
  return response;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userData = await fetchUser();
        setUser(userData);
        setError(null);
      } catch (err: any) {
        setUser(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const logout = () => {
    setUser(null);

  };

  return (
    <AuthContext.Provider value={{ user, token: null, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
