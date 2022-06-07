import styled from "styled-components";
import bgImage from "../image/coffeeshop.jpg";

const Img = styled.img`
  background-position: center;
  background-size: cover;
  object-fit: cover;
  min-height: 100%;
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: -5;
`;

const Layer = styled.div`
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -4;
`;

const Bg = () => {
  return (
    <>
      <Img src={bgImage} alt="background" />
      <Layer />
    </>
  );
};

export default Bg;
