import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

interface ShareInputProps {
  type?: string;
  id?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
}

const Input = styled.input`
  outline: none;
  border: 1px solid ${(props) => props.theme.colors.darkLight};
  width: 50%;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.dark};
  border-radius: 5px;
  &::placeholder {
    color: ${(props) => props.theme.colors.darkLight};
  }
`;

const ShareInput: React.FC<ShareInputProps> = ({
  id,
  type = "text",
  placeholder,
  register,
}) => {
  return <Input {...register} placeholder={placeholder} id={id} type={type} />;
};

export default ShareInput;
