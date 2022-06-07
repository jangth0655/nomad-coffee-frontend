import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Bg from "../bg";

interface LayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: white;
`;

const Title = styled.h1`
  font-weight: 600;
  text-transform: uppercase;
  font-style: italic;
  margin-right: 0.5rem;
`;

const Main = styled.main`
  border-radius: 10px;
  width: 30rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 1rem;
`;

const Layer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;
  opacity: 0.6;
  z-index: -2;
  border-radius: 10px;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Bg />
      <TitleContainer>
        <Title>Coffee</Title>
        <FontAwesomeIcon icon={faCoffee} />
      </TitleContainer>
      <Main>
        <Layer />
        {children}
      </Main>
    </Container>
  );
};

export default Layout;
