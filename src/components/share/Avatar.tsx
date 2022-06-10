import React from "react";
import styled from "styled-components";

interface AvatarProps {
  url?: string;
}

const AvatarBox = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  background-color: white;
  border-radius: 50%;
`;

const AvatarUrl = styled.img`
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-size: cover;
  object-fit: cover;
  border-radius: 50%;
`;

const Avatar: React.FC<AvatarProps> = ({ url }) => {
  return url ? (
    <AvatarBox>
      <AvatarUrl src={url} />
    </AvatarBox>
  ) : (
    <AvatarBox />
  );
};

export default Avatar;
