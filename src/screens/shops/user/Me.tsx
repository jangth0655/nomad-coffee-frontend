import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../../../components/ErrorMessage";
import Layout from "../../../components/Layout";
import ShareButton from "../../../components/share/ShareButton";
import ShareInput from "../../../components/share/ShareInput";
import useUser from "../../../libs/useUser";
import routes from "../../../routes";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $username: String
    $email: String
    $name: String
    $password: String
    $avatarURL: Upload
    $githubUsername: String
  ) {
    editProfile(
      username: $username
      email: $email
      name: $name
      password: $password
      avatarURL: $avatarURL
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const LabelName = styled.label`
  display: flex;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
  cursor: pointer;
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 3rem;
  width: 100%;
`;

const AvatarBox = styled.label`
  width: 10rem;
  height: 10rem;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const AvatarInput = styled.input`
  display: none;
`;

const Avatar = styled.img`
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-size: cover;
  object-fit: cover;
  border-radius: 50%;
`;

const History = styled.div`
  padding: 0.3em 1rem;
  margin-top: 0.5rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.accent};
  opacity: 0.6;
  color: ${(props) => props.theme.colors.darkLight};
  transition: 150ms all cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  &:hover {
    color: white;
    opacity: 1;
  }
`;

const HistorySpan = styled.span`
  font-size: 0.8rem;
`;

const Box = styled.div`
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled(LabelName)``;

interface EditProfileForm {
  username: string;
  email: string;
  name: string;
  password: string;
  avatarURL: FileList;
  githubUsername: string;
  error?: string;
}

interface EditProfileMutation {
  editProfile: {
    ok: boolean;
    error?: string;
  };
}

const Me: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>();
  const [prevAvatar, setPrevAvatar] = useState("");

  const onCompleted = (data: any) => {
    const {
      editProfile: { ok, error },
    } = data;
    if (ok) {
      setError("error", { message: error });
    }
  };

  const [edit, { loading, data: editData }] = useMutation<EditProfileMutation>(
    EDIT_PROFILE_MUTATION,
    {
      onCompleted,
    }
  );

  const image = watch("avatarURL");
  useEffect(() => {
    if (image && image.length > 0) {
      const imageFile = image[0];
      setPrevAvatar(URL.createObjectURL(imageFile));
    }
  }, [image]);

  useEffect(() => {
    if (user) {
      user.username && setValue("username", user.username);
      user.name && setValue("name", user.name);
      user.email && setValue("email", user.email);
      user.githubUsername && setValue("githubUsername", user.githubUsername);
    }
  }, [setValue, user]);

  useEffect(() => {
    if (editData && editData.editProfile.ok) {
      navigate(routes.home);
    }
  }, [editData, navigate]);

  const onValid = (data: EditProfileForm) => {
    const url = data.avatarURL[0];
    edit({
      variables: {
        ...data,
        avatarURL: url ? url : null,
      },
    });
  };
  const onUserProfile = (id?: number) => {
    navigate(`/users/profile/${id}`, {
      state: { user },
    });
  };
  return (
    <Layout back={true} title="Profile">
      <Section>
        <Form onSubmit={handleSubmit(onValid)}>
          <AvatarSection>
            <AvatarBox htmlFor="avatar">
              <AvatarInput
                {...register("avatarURL")}
                id="avatar"
                type="file"
                accept="image/*"
              />
              {prevAvatar && <Avatar src={prevAvatar} />}
              {user?.avatarURL ? <Avatar src={user?.avatarURL} /> : null}
            </AvatarBox>
            <History onClick={() => onUserProfile(user?.id)}>
              <HistorySpan>History</HistorySpan>
            </History>
          </AvatarSection>

          <Box>
            <Name htmlFor="username">Username</Name>
            <ShareInput
              register={register("username")}
              id="username"
              placeholder="username"
            />
          </Box>
          <Box>
            <Name htmlFor="name">Name</Name>
            <ShareInput
              register={register("name")}
              id="name"
              placeholder="name"
            />
            {/* <ErrorMessage /> */}
          </Box>
          <Box>
            <Name htmlFor="email">Email</Name>
            <ShareInput
              register={register("email")}
              id="email"
              placeholder="email"
            />
            {/* <ErrorMessage /> */}
          </Box>
          <Box>
            <Name htmlFor="github">Github Username</Name>
            <ShareInput
              register={register("githubUsername")}
              id="github"
              placeholder="github"
            />
          </Box>

          <Box>
            <Name htmlFor="password">Password</Name>
            <ShareInput id="password" placeholder="password" />
          </Box>

          <div style={{ margin: "2rem 0" }}>
            <ShareButton text="Edit" loading={loading} />
          </div>
          {errors.error?.message && (
            <ErrorMessage message={errors.error?.message} />
          )}
        </Form>
      </Section>
    </Layout>
  );
};

export default Me;
