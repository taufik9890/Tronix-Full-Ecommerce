"use client";
import React from "react";
import Pagination from "./Pagination";

const BlogRight = () => {
  return (
    <div className="blg-right-part">
      <Pagination itemsPerPage={4} />
    </div>
  );
};

export default BlogRight;
