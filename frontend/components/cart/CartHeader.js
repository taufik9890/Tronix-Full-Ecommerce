import React from "react";
import "./style.css";

const CartHeader = () => {
  return (
    <div className="cart-heading">
      <h4>My Cart</h4>
      <div className="cart-progress">
        <div className="progress-one">
          <span className="step">1</span>
          <span>My Cart</span>
        </div>
        <span className="progress-bar"></span>
        <div className="progress-two">
          <span className="step">2</span>
          <span className="check">Checkout</span>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
