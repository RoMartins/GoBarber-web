import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/ToastContext';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransition = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', transform: 'rotateX(90deg)' },
      enter: { right: '0%', transform: 'rotateX(360deg)' },
      leave: { right: '-120%', transform: 'rotateX(90deg)' },
    },
  );
  return (
    <Container>
      {messagesWithTransition.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props}></Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
