import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  role: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Mock user data for demonstration purposes
const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@iutdouala.cm',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Teacher User',
    email: 'teacher@iutdouala.cm',
    role: 'teacher',
    department: 'Computer Science',
  },
  {
    id: 3,
    name: 'Student User',
    email: 'student@iutdouala.cm',
    role: 'student',
    department: 'Computer Science',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    // In a real app, this would make an API call to your Laravel backend
    try {
      // For demo purposes, we'll use our mock data
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.role === role
      );

      if (user) {
        setState({
          user,
          isAuthenticated: true,
          role: user.role,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setState(initialState);
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;