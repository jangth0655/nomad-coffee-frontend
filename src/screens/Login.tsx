import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";

import AuthButton from "../components/auth/AuthButton";
import AuthFormBox from "../components/auth/AuthFormBox";
import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";
import ErrorMessage from "../components/ErrorMessage";
import PageTitle from "../components/PageTitle";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 0.5rem;
`;

const Notification = styled.h1`
  color: ${(props) => props.theme.colors.dark};
  font-weight: 600;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

interface LoginForm {
  username: string;
  password: string;
  error?: string;
}

interface LoginMutation {
  login: {
    ok: boolean;
    token?: string;
    error?: string;
  };
}

interface LoginState {
  username: string;
  message: string;
}

const Login = () => {
  const location = useLocation();
  const state = location.state as LoginState;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm<LoginForm>();

  const onValid = (data: LoginForm) => {
    if (loading) return;
    login({
      variables: {
        ...data,
      },
    });
  };

  useEffect(() => {
    if (state && state.username) {
      setValue("username", state.username);
    }
  }, []);

  const onCompleted = (data: any) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("error", { message: error });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation<LoginMutation>(LOGIN_MUTATION, {
    onCompleted,
  });

  const clearLoginError = () => {
    clearErrors("error");
  };

  return (
    <AuthLayout>
      <PageTitle title="LogIn" />
      <AuthFormBox title="login">
        <Form onSubmit={handleSubmit(onValid)}>
          <AuthInput
            register={register("username", {
              required: "Username is required.",
              onChange: clearLoginError,
            })}
            placeholder="username"
            label="username"
            id="username"
          />
          {errors.username?.message && (
            <ErrorMessage message={errors.username?.message} />
          )}
          <AuthInput
            register={register("password", {
              required: "Password is required.",
              pattern: {
                message: "한글, 특문를 제외한 영문만 사용 가능",
                value: /^[a-z0-9]{1,15}$/g,
              },
              onChange: clearLoginError,
            })}
            placeholder="password"
            label="password"
            id="password"
          />
          {errors.password?.message && (
            <ErrorMessage message={errors.password.message} />
          )}
          <AuthButton text="Log in" loading={loading} />
          {errors.error?.message && (
            <ErrorMessage message={errors.error?.message} />
          )}
        </Form>
        {state?.message && <Notification>{state?.message}</Notification>}
      </AuthFormBox>
    </AuthLayout>
  );
};

export default Login;
