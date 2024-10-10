import React from "react";
import "./style.css";
import Link from "next/link";

const Breadcrumb = () => {
  return (
    <div>
      <span className="breadcrumb">
        <Link href={"/"}>Home</Link>
        <span>{">"}</span>
        <Link href={"/cart"}>My Cart</Link>
        <span>{">"}</span>Checkout
      </span>
    </div>
  );
};

export default Breadcrumb;
