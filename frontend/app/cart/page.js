import Breadcrumb from "@/components/cart/Breadcrumb";
import CartHeader from "@/components/cart/CartHeader";
import CartProduct from "@/components/cart/CartProduct";
import Container from "@/components/container/Container";
import React from "react";

const MyCart = () => {
  return (
    <Container>
      <Breadcrumb />
      <CartHeader />
      <CartProduct />
    </Container>
  );
};

export default MyCart;
