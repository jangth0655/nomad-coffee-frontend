import React from "react";
import styled from "styled-components";

interface ErrorProps {
  message: string;
}

const ErrorText = styled.h1`
  color: red;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 0.5rem;
`;

const ErrorMessage: React.FC<ErrorProps> = ({ message }) => {
  return <ErrorText>{message}</ErrorText>;
};

export default ErrorMessage;
