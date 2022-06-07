import React from "react";
import styled from "styled-components";

interface AuthButtonProps {
  loading?: boolean;
  text?: string;
}

const Button = styled.button`
  border: 0;
  outline: none;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  color: white;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  font-style: italic;
  font-size: 1.1rem;
  background-color: ${(props) => props.theme.accent};
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transition: 150ms all cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const AuthButton: React.FC<AuthButtonProps> = ({ loading, text }) => {
  return <Button>{loading ? "Loading" : text}</Button>;
};

export default AuthButton;
