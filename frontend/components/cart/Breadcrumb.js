import Link from "next/link";
import React from "react";
import "./style.css";

const Breadcrumb = () => {
  return (
    <div>
      <span className="breadcrumb">
        <Link href={"/"}>Home</Link>
        <span>{">"}</span>My Cart
      </span>
    </div>
  );
};

export default Breadcrumb;
