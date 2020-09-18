import React from 'react';

import ImageBackground from '../../assets/sign-in-background.png';
import Logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={Logo} alt="GoBarber" />

      <form>
        <h1>Faça seu logon</h1>

        <input placeholder="E-mail"/>
        </input>
      </form>
    </Content>
    <Background />
  </Container>
);
export default SignIn;
