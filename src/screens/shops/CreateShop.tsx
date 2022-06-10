import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import ShareButton from "../../components/share/ShareButton";
import ShareInput from "../../components/share/ShareInput";
import ShareTextArea from "../../components/share/ShareTextArea";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { isLoggedInVar } from "../../apollo";
import routes from "../../routes";

const CREATE_COFFEE__SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $url: Upload
    $latitude: String
    $longitude: String
    $payload: String
    $name: String!
    $categoryName: String!
  ) {
    createCoffeeShop(
      url: $url
      latitude: $latitude
      longitude: $longitude
      payload: $payload
      name: $name
      categoryName: $categoryName
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

/* const LocationBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Location = styled(LabelName)``;
 */
const SelectImage = styled.label`
  position: relative;
  margin: auto;
  margin-bottom: 1.5rem;
  width: 100%;
  height: 10rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted ${(props) => props.theme.colors.someDark};
  color: ${(props) => props.theme.colors.darkMedium};
  transition: 150ms all cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.theme.colors.darkest};
    color: ${(props) => props.theme.colors.dark};
  }
`;

const ImageFile = styled.input`
  display: none;
`;

const ImageBox = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Img = styled.img`
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-size: cover;
  object-fit: contain;
`;

interface UploadForm {
  name: string;
  payload: string;
  categoryName: string;
  url?: FileList;
  error?: string;
}

interface CreateShopMutation {
  createCoffeeShop: {
    ok: boolean;
    error?: string;
  };
}

const CreateShops: React.FC = () => {
  const loggedIn = useReactiveVar(isLoggedInVar);
  const navigate = useNavigate();
  const { register, handleSubmit, setError, watch } = useForm<UploadForm>();
  const [prev, setPrev] = useState("");
  const onCompleted = (data: any) => {
    const {
      createCoffeeShop: { ok },
    } = data;
    if (!ok) {
      setError("error", { message: "upload error" });
    }
  };
  const [upload, { data, loading }] = useMutation<CreateShopMutation>(
    CREATE_COFFEE__SHOP_MUTATION,
    {
      onCompleted,
    }
  );
  const onValid = ({ categoryName, name, payload, url }: UploadForm) => {
    const file = url && url[0];
    if (loading) return;
    upload({
      variables: {
        categoryName,
        name,
        payload,
        url: file ? file : null,
      },
    });
  };

  const image = watch("url");
  useEffect(() => {
    if (image && image.length > 0) {
      const imageFile = image[0];
      setPrev(URL.createObjectURL(imageFile));
    }
  }, [image]);

  useEffect(() => {
    if (!loggedIn) {
      navigate(routes.home);
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (data && data.createCoffeeShop.ok) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Layout back={true} showing={true} title="Upload">
      <PageTitle title="Upload" />
      <Form onSubmit={handleSubmit(onValid)}>
        <Box>
          <Name htmlFor="name">Name</Name>
          <ShareInput
            register={register("name")}
            id="name"
            placeholder="name"
          />
        </Box>
        <Box>
          <CategoryName htmlFor="Category">Category</CategoryName>
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
        {/*  <LocationBox>
          <Location>Location</Location>
          <ShareInput />
          <ShareInput />
        </LocationBox> */}

        <SelectImage>
          <FontAwesomeIcon icon={faCloudArrowUp} size="4x" />
          <ImageFile {...register("url")} type="file" accept="image/*" />
          {prev && (
            <ImageBox>
              <Img src={prev} />
            </ImageBox>
          )}
        </SelectImage>
        <ShareButton text="Submit" loading={loading} />
      </Form>
    </Layout>
  );
};

export default CreateShops;
