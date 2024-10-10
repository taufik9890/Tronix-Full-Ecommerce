import React from "react";
// import BlogLeft from "./BlogLeft";
// import BlogRight from "./BlogRight";

const BlogList = () => {
  return (
    <div className="blog-part-start">
      <div className="breadcrumb">
        <ul>
          <li className="brdcmb-list">
            <a href="/">Home</a>
          </li>
          <li className="brdcmb-list">Blog</li>
        </ul>
      </div>

      <div className="blog-heading">
        <h3>Latest Blog</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.{" "}
        </p>
      </div>

      <div className="blg-all-part">
        {/* <BlogLeft />
        <BlogRight /> */}
      </div>
    </div>
  );
};

export default BlogList;
