import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthButton from "../components/auth/AuthButton";
import AuthFormBox from "../components/auth/AuthFormBox";

import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";

import ErrorMessage from "../components/ErrorMessage";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
    $name: String!
    $githubUsername: String
    $location: String
  ) {
    createAccount(
      username: $username
      email: $email
      password: $password
      name: $name
      githubUsername: $githubUsername
      location: $location
    ) {
      ok
      error
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 0.5rem;
`;

interface SignUpForm {
  username: string;
  email: string;
  password: string;
  name?: string;
  githubUsername?: string;
  location?: string;
  error?: string;
}

interface SignUpMutation {
  createAccount: {
    ok: boolean;
    error?: string;
  };
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    getValues,
  } = useForm<SignUpForm>();
  const navigate = useNavigate();
  const onCompleted = (data: any) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError("error", { message: error });
    }
  };

  const [createAccount, { data: AccountData, loading }] =
    useMutation<SignUpMutation>(CREATE_ACCOUNT_MUTATION, {
      onCompleted,
    });
  const onValid = ({
    email,
    username,
    password,
    githubUsername,
    location,
    name,
  }: SignUpForm) => {
    if (loading) return;
    createAccount({
      variables: {
        email,
        username,
        password,
        githubUsername: githubUsername ? githubUsername : null,
        location: location ? location : null,
        name,
      },
    });
  };

  useEffect(() => {
    const username = getValues("username");
    if (AccountData && AccountData.createAccount.ok) {
      navigate(routes.home, {
        state: {
          username,
          message: "Account created, Please log in.",
        },
      });
    }
  }, [AccountData, getValues, navigate]);

  const clearLoginError = () => {
    clearErrors("error");
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <AuthFormBox title="signup">
        <Form onSubmit={handleSubmit(onValid)}>
          <AuthInput
            register={register("username", {
              required: "Username is required",
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
            register={register("email", {
              required: "Email is required",
              onChange: clearLoginError,
            })}
            placeholder="email"
            label="email"
            id="email"
          />
          {errors.email?.message && (
            <ErrorMessage message={errors.email?.message} />
          )}
          <AuthInput
            register={register("password", {
              required: "Password is required",
              onChange: clearLoginError,
            })}
            placeholder="password"
            label="password"
            id="password"
          />
          {errors.password?.message && (
            <ErrorMessage message={errors.password?.message} />
          )}
          <AuthInput
            register={register("name", {
              required: "Password is required",
            })}
            placeholder="name"
            label="name"
            id="name"
          />
          <AuthInput
            register={register("githubUsername")}
            placeholder="github"
            label="github"
            id="github"
          />
          <AuthInput
            register={register("location")}
            placeholder="location"
            label="location"
            id="location"
          />
          <AuthButton text="Sign up" loading={loading} />
          {errors.error?.message && (
            <ErrorMessage message={errors.error?.message} />
          )}
        </Form>
      </AuthFormBox>
    </AuthLayout>
  );
};

export default SignUp;
