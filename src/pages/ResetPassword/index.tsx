import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import validationError from '../../utils/getValidationErrors';

import Logo from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/Button';
import { Container, Content, Background, AnimatedContainer } from './styles';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/api';

interface ResetPasswordFormData {
  password_confirmation: string;
  password: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleLogin = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api.post('reset-password');

        history.push('/signin');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = validationError(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar a senha',
          description: 'Ocorreu um erro ao  resetar a senha, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={Logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleLogin}>
            <h1>Resetar senha</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação de senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimatedContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default ResetPassword;
