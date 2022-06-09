import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

interface TextAreaProps {
  id?: string;
  register?: UseFormRegisterReturn;
}

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.darkLight};
  border-radius: 5px;
  outline: none;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.dark};
`;

const ShareTextArea: React.FC<TextAreaProps> = ({ id, register }) => {
  return <TextArea {...register} rows={7} id={id}></TextArea>;
};

export default ShareTextArea;
