import Container from "@/components/container/Container";
import SingleProduct from "@/components/productview";
import SingleProductBottom from "@/components/productview/SingleProductBottom";
import SingleProductView from "@/components/productview/SingleProductView";
import React from "react";

const ProductView = ({ params }) => {
  return (
    <Container>
      <SingleProduct slug={params.slug} />
    </Container>
  );
};

export default ProductView;
