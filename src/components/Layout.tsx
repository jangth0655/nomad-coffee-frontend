import React from "react";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useUser from "../libs/useUser";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import Avatar from "./share/Avatar";

interface LayoutProps {
  children: React.ReactNode;
  back?: boolean;
  showing?: boolean;
  title?: string;
}

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: white;
  background-color: ${(props) => props.theme.colors.dark};
  z-index: 100;
`;

const LeftCol = styled.div`
  cursor: pointer;
`;

const RightCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Username = styled.span`
  font-size: 0.7rem;
  margin-top: 0.4rem;
`;

const Main = styled.main<{ showing?: boolean }>`
  margin: auto;
  max-width: 1024px;
  min-height: 100vh;
  padding: ${(props) => (props.showing ? "6rem" : "1.2rem")} 1.5rem;
`;

const Back = styled.div`
  background-color: rgb(75 85 99);
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: 150ms all cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    background-color: ${(props) => props.theme.colors.darkest};
  }
`;

const Logout = styled.div`
  margin-right: 1.2rem;
  cursor: pointer;
  transition: 150ms all cubic-bezier(0.4, 0, 0.2, 1);
  color: ${(props) => props.theme.colors.darkMedium};
  &:hover {
    color: white;
  }
`;

const Layout: React.FC<LayoutProps> = ({
  children,
  back,
  showing = true,
  title,
}) => {
  const loggedIn = useReactiveVar(isLoggedInVar);
  const navigate = useNavigate();
  const { user } = useUser();

  const onBack = () => {
    navigate(-1);
  };
  const onHome = () => {
    navigate("/");
  };

  const onLogout = () => {
    logUserOut(navigate);
  };

  const onProfile = (id?: number) => {
    navigate(`/users/me/${id}`);
  };

  return (
    <section>
      {showing ? (
        <Nav>
          <LeftCol>
            <FontAwesomeIcon onClick={() => onHome()} icon={faCoffee} />
          </LeftCol>
          <Title>
            <span>{title}</span>
          </Title>
          <RightCol>
            {loggedIn ? (
              <Logout onClick={() => onLogout()}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </Logout>
            ) : null}

            <div
              style={{ cursor: "pointer" }}
              onClick={() => onProfile(user?.id)}
            >
              {user ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar url={user.avatarURL} />
                  <Username>{user?.username}</Username>
                </div>
              ) : (
                <Avatar></Avatar>
              )}
            </div>
          </RightCol>
        </Nav>
      ) : null}

      <Main showing={showing}>
        {back ? (
          <Back onClick={() => onBack()}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Back>
        ) : null}
        {children}
      </Main>
    </section>
  );
};

export default Layout;
