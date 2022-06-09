import { gql } from "@apollo/client";
export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    isMe
    id
    username
    avatarURL
    totalFollowing
    totalFollowers
  }
`;

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on CoffeeShop {
    photos
  }
`;
