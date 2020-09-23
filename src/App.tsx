import React from 'react';
import AppProvider from './hooks';
import SignIn from './pages/Sign-in';

// import SignUp from './pages/Sign-up';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <SignIn />
    </AppProvider>
  </>
);

export default App;
