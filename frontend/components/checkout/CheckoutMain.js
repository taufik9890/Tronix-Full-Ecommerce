import React from "react";
import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";
import "./style.css";

const CheckoutMain = () => {
  return (
    <div className="checkout-main">
      <div className="checkout-form-wrapper">
        <CheckoutForm />
      </div>
      <div className="checkout-summary-wrapper">
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default CheckoutMain;
