import React from 'react';
import SignIn from './pages/Sign-in';
import SignUp from './pages/Sign-up';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <SignUp />
  </>
);

export default App;
