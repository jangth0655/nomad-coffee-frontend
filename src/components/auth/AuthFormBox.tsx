import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";

interface FormBoxProps {
  children?: React.ReactNode;
  title?: "signup" | "login";
}

const Container = styled.div`
  width: 100%;
`;

const FormTitleBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const SignTitle = styled.span<{ activeTitle?: boolean }>`
  font-weight: 600;
  text-transform: uppercase;
  color: ${(props) => props.theme.accent};
  text-align: center;
  margin-bottom: 0.2rem;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  background-color: ${(props) => (props.activeTitle ? "white" : "")};
`;

const LoginTitle = styled(SignTitle)``;

const AuthFormBox: React.FC<FormBoxProps> = ({ children, title }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <FormTitleBox>
        <SignTitle
          onClick={() => navigate(routes.signUp)}
          activeTitle={title === "signup"}
        >
          Sign up
        </SignTitle>
        <LoginTitle
          onClick={() => navigate(routes.home)}
          activeTitle={title === "login"}
        >
          Log in
        </LoginTitle>
      </FormTitleBox>
      {children}
    </Container>
  );
};

export default AuthFormBox;
