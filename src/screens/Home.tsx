import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/Layout";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { ShopWithUser } from "../interface/interface";
import { useState } from "react";
import CoffeeItem from "../components/coffeeShop/CoffeeItem";
import { USER_FRAGMENT } from "../fragment";

const SEE_COFFEE_SHOPS = gql`
  ${USER_FRAGMENT}
  query seeCoffeeShops($page: Int) {
    seeCoffeeShops(page: $page) {
      id
      name
      payload
      photos {
        id
        url
      }
      slug
      user {
        ...UserFragment
      }
    }
  }
`;

const Upload = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
  background-color: rgb(75 85 99);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: 150ms all cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    background-color: ${(props) => props.theme.colors.darkest};
  }
`;

const PageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.dark};
  opacity: 0.5;
  transition: 150ms all cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    opacity: 1;
  }
`;

interface CoffeeShops {
  seeCoffeeShops: ShopWithUser[];
}

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data } = useQuery<CoffeeShops>(SEE_COFFEE_SHOPS, {
    variables: {
      page,
    },
  });
  const pageSize = 5;
  const totalItems = data?.seeCoffeeShops.length;
  const offset = totalItems ? Math.ceil(totalItems / pageSize) : 0;

  const togglePage = (direction: "left" | "right") => {
    if (direction === "left") {
      page === 1 ? setPage(1) : setPage((prev) => prev - 1);
    }
    if (direction === "right" && totalItems) {
      page === offset
        ? setPage((prev) => prev + 1)
        : setPage((prev) => prev - 1);
    }
  };

  const onCreateShop = () => {
    navigate("/shops/uploads");
  };

  return (
    <Layout title="Home" showing={true} back={false}>
      <PageBox>
        <FontAwesomeIcon
          onClick={() => togglePage("left")}
          icon={faAnglesLeft}
        />
        <FontAwesomeIcon
          onClick={() => togglePage("right")}
          icon={faAnglesRight}
        />
      </PageBox>
      {data?.seeCoffeeShops.map((item) => (
        <CoffeeItem key={item.id} {...item} />
      ))}

      <Upload onClick={() => onCreateShop()}>
        <FontAwesomeIcon icon={faPlus} />
      </Upload>
    </Layout>
  );
};

export default Home;
