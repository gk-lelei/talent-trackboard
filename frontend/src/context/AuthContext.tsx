
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const res = await authAPI.getCurrentUser();
          setUser(res.data.user);
        } catch (error) {
          console.error('Auth token invalid or expired', error);
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await authAPI.login(email, password);
      const { token, user } = res.data;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      setUser(user);
      
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${user.name}!`,
      });
      
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.response?.data?.message || 'Invalid email or password',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const res = await authAPI.register(name, email, password);
      const { token, user } = res.data;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      setUser(user);
      
      toast({
        title: 'Registration Successful',
        description: 'Your account has been created successfully!',
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: error.response?.data?.message || 'Registration failed. Please try again.',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
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
