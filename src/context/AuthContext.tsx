import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}
interface Auth {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}
const AuthContext = createContext<Auth>({} as Auth);

const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'rodrigo', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
