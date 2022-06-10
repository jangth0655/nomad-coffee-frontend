import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CoffeeItem from "../../../components/coffeeShop/CoffeeItem";
import Layout from "../../../components/Layout";
import { CoffeeShop, User } from "../../../interface/interface";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      user {
        userCoffeeShops {
          id
          slug
          payload
          name
          photos {
            id
            url
          }
        }
      }
    }
  }
`;

const ListTitle = styled.h1`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

interface SeeProfileQuery {
  seeProfile: {
    user: {
      userCoffeeShops: CoffeeShop[];
    };
  };
}

interface LocationState {
  user: User;
}

const Profile: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const user = state?.user;

  const { data: userData } = useQuery<SeeProfileQuery>(SEE_PROFILE_QUERY, {
    variables: {
      username: user?.username,
    },
  });

  const CoffeeShops = userData?.seeProfile.user.userCoffeeShops;

  return (
    <Layout back={true} title={`${user?.username}'s History`}>
      <ListTitle>History</ListTitle>
      {CoffeeShops?.map((shop) => (
        <CoffeeItem key={shop.id} user={user} {...shop} />
      ))}
    </Layout>
  );
};

export default Profile;
