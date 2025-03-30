import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '@/services/api';
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  profileComplete: boolean;
}

interface AuthContextProps {
  auth: {
    token: string | null;
    user: User | null;
  };
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  auth: {
    token: null,
    user: null,
  },
  user: null,
  setUser: () => {},
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<{ token: string | null; user: User | null }>({
    token: localStorage.getItem('token'),
    user: null,
  });
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const fetchCurrentUser = async () => {
        setIsLoading(true);
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.data.user);
          setAuth({ token: storedToken, user: response.data.user });
        } catch (error) {
          console.error('Failed to fetch current user:', error);
          localStorage.removeItem('token');
          setAuth({ token: null, user: null });
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCurrentUser();
    }
  }, []);

  // Login user
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setAuth({ token, user });
      setIsLoading(false);
      
      // Use Sonner toast instead of the old toast system
      toast.success("Login successful!");
      
      return true;
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      
      // Use Sonner toast for error
      toast.error(errorMessage);
      
      return false;
    }
  };

  // Register user
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(name, email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setAuth({ token, user });
      setIsLoading(false);
      
      // Use Sonner toast instead
      toast.success("Registration successful!");
      
      return true;
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      
      // Use Sonner toast for error
      toast.error(errorMessage);
      
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuth({ token: null, user: null });
    
    // Use Sonner toast
    toast.info("You have been logged out");
  };

  const contextValue: AuthContextProps = {
    auth,
    user,
    setUser,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
