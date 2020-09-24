import styled, { css } from 'styled-components';

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,

  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,

  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 360px;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  display: flex;
  position: relative;
  background: #ebf8ff;
  color: #3172b7;

  ${props => toastTypeVariations[props.type || 'info']}

  & + div {
    margin-top: 8px;
  }
  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: none;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
