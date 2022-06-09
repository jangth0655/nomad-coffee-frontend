import { gql, useQuery, useReactiveVar } from "@apollo/client";

import { isLoggedInVar } from "../apollo";
import { USER_FRAGMENT } from "../fragment";
import { User } from "../interface/interface";

const ME_QUERY = gql`
  ${USER_FRAGMENT}
  query me {
    me {
      ...UserFragment
    }
  }
`;

interface UserQuery {
  me: User;
}

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery<UserQuery>(ME_QUERY, {
    skip: !hasToken,
  });

  return { user: data?.me, loading: !data && !error };
};

export default useUser;
