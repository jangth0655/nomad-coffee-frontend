import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import ShareButton from "../../components/share/ShareButton";
import ShareInput from "../../components/share/ShareInput";
import ShareTextArea from "../../components/share/ShareTextArea";
import routes from "../../routes";

const EDIT_COFFEE_SHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $payload: String
    $latitude: String
    $longitude: String
    $url: Upload
    $categoryName: String
    $photoId: Int
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      payload: $payload
      latitude: $latitude
      longitude: $longitude
      url: $url
      categoryName: $categoryName
      photoId: $photoId
    ) {
      ok
      error
    }
  }
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

const Box = styled.div`
  margin-bottom: 1.25rem;
`;

const Name = styled(LabelName)``;

const CategoryName = styled(LabelName)``;

const Description = styled(LabelName)``;

const ImageBox = styled.label`
  width: 10rem;
  height: 15rem;
  background-color: white;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 2rem;
  border: 1px dotted ${(props) => props.theme.colors.darkLight};
  padding: 0.5rem 0;
  cursor: pointer;
`;

const Img = styled.img`
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-size: cover;
  object-fit: contain;
`;
const ImageInput = styled.input`
  display: none;
`;

interface EditForm {
  name?: string;
  payload?: string;
  latitude?: string;
  longitude?: string;
  url?: FileList;
  categoryName?: string;
  error?: string;
}

interface EditMutation {
  editCoffeeShop: {
    ok: boolean;
    error?: string;
  };
}

interface PhotoState {
  id: number;
  name: string;
  payload: string;
  photos: {
    url: string;
    id: number;
  }[];
}

const EditShop = () => {
  const location = useLocation();
  const state = location.state as PhotoState | null;
  const id = state?.id;
  const name = state?.name;
  const payload = state?.payload;
  const photoUrl = state?.photos[0].url;
  const photoId = state?.photos[0].id;
  const [imagePre, seImagePre] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<EditForm>();

  const onCompleted = (data: any) => {
    const {
      editCoffeeShop: { ok, error },
    } = data;

    if (!ok) {
      setError("error", { message: error });
    }
  };

  const [edit, { loading, data: editData }] = useMutation<EditMutation>(
    EDIT_COFFEE_SHOP_MUTATION,
    { onCompleted }
  );

  const onValid = (data: EditForm) => {
    if (loading) return;
    const url = data.url && data.url[0];
    edit({
      variables: { ...data, id, photoId, url },
    });
  };

  useEffect(() => {
    if (editData && editData.editCoffeeShop.ok) {
      navigate(routes.home);
    }
  }, [editData, navigate]);

  const imageFile = watch("url");
  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      seImagePre(URL.createObjectURL(file));
    }
  }, [imageFile]);

  useEffect(() => {
    if (state) {
      name && setValue("name", name);
      payload && setValue("payload", payload);
    }
  }, []);

  const clearLoginError = () => {
    clearErrors("error");
  };

  return (
    <Layout back={true} showing={true} title="Edit">
      <PageTitle title="Upload" />
      <Form onSubmit={handleSubmit(onValid)}>
        <Box>
          <Name htmlFor="name">Name</Name>
          <ShareInput
            register={register("name", {
              required: true,
              onChange: clearLoginError,
            })}
            id="name"
            placeholder="name"
          />
          {errors.error?.message && (
            <div style={{ marginTop: "0.5rem" }}>
              <ErrorMessage message={errors.error?.message} />
            </div>
          )}
        </Box>
        <Box>
          <CategoryName htmlFor="Category">CategoryName</CategoryName>
          <ShareInput
            register={register("categoryName")}
            id="Category"
            placeholder="Category"
          />
        </Box>

        <Box>
          <Description htmlFor="Description">Description</Description>
          <ShareTextArea register={register("payload")} id="Description" />
        </Box>

        <ImageBox htmlFor="image">
          <ImageInput
            {...register("url")}
            type="file"
            id="image"
            accept="image/*"
          />
          <Img src={imagePre ? imagePre : photoUrl} />
        </ImageBox>
        <ShareButton text="Update" loading={loading} />
      </Form>
    </Layout>
  );
};

export default EditShop;
