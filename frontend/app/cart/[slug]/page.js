import Breadcrumb from "@/components/checkout/Breadcrumb";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutMain from "@/components/checkout/CheckoutMain";
import Container from "@/components/container/Container";
import React from "react";

const Checkout = () => {
  return (
    <Container>
      <Breadcrumb />
      <CheckoutHeader />
      <CheckoutMain />
    </Container>
  );
};

export default Checkout;
