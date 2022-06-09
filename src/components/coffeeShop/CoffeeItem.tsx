import React from "react";
import styled from "styled-components";
import { Photo, User } from "../../interface/interface";
import Avatar from "../share/Avatar";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ItemBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const ImageBox = styled.div`
  width: 18rem;
  height: 18rem;
  background-color: ${(props) => props.theme.colors.darkLight};
  width: 50%;
  border-radius: 5px; ;
`;

const Img = styled.img`
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-size: cover;
  object-fit: cover;
`;

const InfoBox = styled.div`
  width: 50%;
  padding: 0.7rem;
`;

const TextBox = styled.div`
  width: 100%;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const TopBox = styled.div``;

const DownBox = styled.div`
  margin-top: 1rem;
`;

const TitleName = styled.span`
  margin-bottom: 0.2rem;
  font-weight: 600;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.darkest};
`;

const Payload = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.dark};
`;

const Name = styled(Payload)``;

const Category = styled(Payload)``;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
`;

const Username = styled(Payload)`
  margin-left: 0.3rem;
`;

const Description = styled(Payload)``;

const EditBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 5px;
  color: white;
  font-size: 0.7rem;
  background-color: ${(props) => props.theme.colors.darkLight};
  right: 0.7rem;
  cursor: pointer;
  transition: 150ms all cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    background-color: ${(props) => props.theme.colors.dark};
  }
`;

interface CoffeeItemsProps {
  id: number;
  name: string;
  slug: string;
  payload?: string;
  photos?: Photo[];
  user: User;
}

const CoffeeItem: React.FC<CoffeeItemsProps> = ({
  id,
  name,
  slug,
  payload,
  photos,
  user,
}) => {
  const navigate = useNavigate();
  const firstPhoto = photos && photos[0].url;

  const onEditShop = () => {
    navigate(`/shops/edit/${id}`, { state: { photos, name, payload, id } });
  };
  return (
    <ItemBox>
      <EditBox onClick={() => onEditShop()}>
        <FontAwesomeIcon icon={faPen} />
      </EditBox>
      <ImageBox>{photos && <Img src={firstPhoto} alt="" />}</ImageBox>

      <InfoBox>
        <TopBox>
          <TextBox>
            <TitleName>Coffee Name</TitleName>
            <Name>{name}</Name>
          </TextBox>
          <TextBox>
            <TitleName>Slug</TitleName>
            <Category>{slug}</Category>
          </TextBox>
          <TextBox>
            <TitleName>Username</TitleName>
            <UserBox>
              <Avatar url={user.avatarURL} />
              <Username>{user.username}</Username>
            </UserBox>
          </TextBox>
        </TopBox>
        <DownBox>
          <Description>{payload}</Description>
        </DownBox>
      </InfoBox>
    </ItemBox>
  );
};

export default CoffeeItem;
