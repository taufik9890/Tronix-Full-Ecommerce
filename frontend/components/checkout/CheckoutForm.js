import React from "react";
import "./style.css";

const CheckoutForm = () => {
  return (
    <div>
      <div className="checkout-title">
        <h5>Buyer Info</h5>
      </div>
      <div className="checkout-form-info">
        <div className="form-element">
          <div className="form-input">
            <label>First Name</label>
            <input type="text" />
          </div>
          <div className="form-input">
            <label>Last Name</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-element">
          <div className="form-input">
            <label>Address</label>
            <input type="text" />
          </div>
          <div className="form-input">
            <label>Contact</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-element">
          <div className="form-input">
            <label>Country</label>
            <input type="text" />
          </div>
          <div className="form-input">
            <label>City</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-element">
          <div className="form-input">
            <label>State</label>
            <input type="text" />
          </div>
          <div className="form-input">
            <label>Zip Code</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-element">
          <div className="form-input">
            <label>Note</label>
            <textarea type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
