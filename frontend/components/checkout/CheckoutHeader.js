import React from "react";

const CheckoutHeader = () => {
  return (
    <div className="checkout-heading">
      <h4>Checkout</h4>
      <div className="checkout-progress">
        <div className="checkout-progress-one">
          <span className="step">1</span>
          <span>My Cart</span>
        </div>
        <span className="checkout-progress-bar"></span>
        <div className="checkout-progress-two">
          <span className="step">2</span>
          <span className="check">Checkout</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
