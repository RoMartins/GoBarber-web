import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { FiArrowLeft, FiMail } from 'react-icons/fi';
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

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleLogin = useCallback(
    async (data: ForgotPasswordFormData) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação de senha',
          description:
            'Enviamos um e-mail para recuperação de senha, cheque sua caixa de entrada',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = validationError(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar recuperar senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={Logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleLogin}>
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar ao login
          </Link>
        </AnimatedContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default ForgotPassword;
