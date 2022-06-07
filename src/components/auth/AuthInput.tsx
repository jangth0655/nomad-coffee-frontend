import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import styled from "styled-components";
import { UseFormRegisterReturn } from "react-hook-form";

type InputString =
  | "username"
  | "email"
  | "password"
  | "github"
  | "name"
  | "location";

interface AuthInputProps {
  placeholder: InputString;
  label?: InputString;
  id?: InputString;
  register?: UseFormRegisterReturn;
}

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  color: ${(props) => props.theme.colors.dark};
  cursor: pointer;
  width: 10%;
  text-align: center;
  margin-right: 5px;
`;

const Input = styled.input`
  border: 0;
  outline: none;
  padding: 0.5rem;
  width: 90%;
  height: 100%;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.dark};
  &:focus {
    border: 2px solid ${(props) => props.theme.colors.darkMedium};
  }
`;

const AuthInput: React.FC<AuthInputProps> = ({
  placeholder,
  id,
  label,
  register,
}) => {
  return (
    <InputBox>
      <Label htmlFor={label}>
        {label === "username" && <FontAwesomeIcon icon={faUser} size={"2x"} />}
        {label === "email" && <FontAwesomeIcon icon={faEnvelope} size={"2x"} />}
        {label === "password" && <FontAwesomeIcon icon={faLock} size={"2x"} />}
        {label === "name" && <FontAwesomeIcon icon={faSmile} size={"2x"} />}
        {label === "github" && <FontAwesomeIcon icon={faGithub} size={"2x"} />}
        {label === "location" && (
          <FontAwesomeIcon icon={faLocationDot} size={"2x"} />
        )}
      </Label>
      <Input
        {...register}
        id={id}
        placeholder={placeholder}
        type={id === "password" ? "password" : ""}
      />
    </InputBox>
  );
};

export default AuthInput;
