import React from "react";
import SingleProductView from "./SingleProductView";
import SingleProductBottom from "./SingleProductBottom";

async function getSingleProductData(slug) {
  let data = await fetch(
    `http://localhost:8000/api/v1/product/singleproduct/${slug}`
  );
  let products = await data.json();
  return products;
}

const SingleProduct = async ({ slug }) => {
  let data = await getSingleProductData(slug);
  console.log(data);

  return (
    <>
      <SingleProductView slug={slug} data={data} />
      <SingleProductBottom />
    </>
  );
};

export default SingleProduct;
