import React from "react";
import "./style.css";
import { cartData } from "@/data/cartData";
import Link from "next/link";

const CheckoutSummary = () => {
  return (
    <div className="checkout-summary-main">
      <h4>Your Order Summary</h4>
      <div className="items-box">
        {cartData.map((item, i) => (
          <div className="items" key={i}>
            <div className="item-title">
              <span>{item.quantity}x</span>
              <p>{item.title}</p>
            </div>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
      <div className="sales-tax">
        <div className="items-total">
          <div className="item-title">
            <p>Subtotal</p>
          </div>
          <p>$700.00</p>
        </div>
        <div className="items-total">
          <div className="item-title">
            <p>Shipping</p>
          </div>
          <p>$10.00</p>
        </div>
        <div className="items-total">
          <div className="item-title">
            <p>Tax</p>
          </div>
          <p>$17.00</p>
        </div>
      </div>
      <div className="total">
        <div className="in-total">
          <div className="item-title">
            <p>Total</p>
          </div>
          <p className="price">$280.00</p>
        </div>
      </div>
      <div className="payment">
        <p>Payment</p>
        <div className="payment-btn">
          <button>Credit Card</button>
          <button>Bank Transfer</button>
          <button>Paypal</button>
        </div>
      </div>
      <div className="checkout-btn">
        <button>Checkout</button>
        <Link href="/cart">Back to Cart</Link>
      </div>
    </div>
  );
};

export default CheckoutSummary;
