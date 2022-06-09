import React from "react";
import styled from "styled-components";

interface ShareButtonProps {
  loading?: boolean;
  text?: string;
}

const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  border: 0;
  outline: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.someDark};
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  transition: 150ms all cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    background-color: ${(props) => props.theme.colors.darkest};
  }
`;

const ShareButton: React.FC<ShareButtonProps> = ({ loading, text }) => {
  return <Button>{loading ? "Loading" : text}</Button>;
};

export default ShareButton;
