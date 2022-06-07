import React from "react";
import { Helmet } from "react-helmet-async";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | NomadCoffee</title>
    </Helmet>
  );
};

export default PageTitle;
