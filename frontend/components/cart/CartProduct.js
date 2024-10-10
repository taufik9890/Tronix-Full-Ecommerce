import { cartData } from "@/data/cartData";
import Cross from "@/public/assets/svg/cross";
import Ticket from "@/public/assets/svg/ticket";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartProduct = () => {
  return (
    <div className="cart-product-main">
      <div className="cart-items">
        <div className="select-all">
          <input type="checkbox" />
          <label htmlFor="">Select All</label>
        </div>
        {cartData.map((item, i) => (
          <div className="product-wrapper">
            <div className="product-main">
              <div className="input">
                <input type="checkbox" />
              </div>

              <div className="product">
                <div className="image"></div>
                <div className="product-details">
                  <h5>{item.title}</h5>
                  <p>${item.price}</p>
                  <div className="cart-btn">
                    <button className="decrease-btn">-</button>
                    <span>{item.quantity}</span>
                    <button className="increase-btn">+</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="cross">
              <Cross />
            </div>
          </div>
        ))}
      </div>
      <div className="cart-checkout">
        <div className="coupon">
          <div className="ticket">
            <Ticket />
          </div>
          <h5>Have a coupon code?</h5>
          <span>{">"}</span>
        </div>
        <div className="summary">
          <h5>Summary</h5>
          <div className="total-price">
            <p className="total">Total</p> <p className="amount">$202.50</p>
          </div>
          <div className="checkout-btn">
            <button>Checkout</button>
          </div>
          <div className="shopping-btn">
            <Link href="/">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
