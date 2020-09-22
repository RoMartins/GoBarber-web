import React from 'react';
import { AuthProvider } from './context/AuthContext';
import SignIn from './pages/Sign-in';
import SignUp from './pages/Sign-up';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  </>
);

export default App;
