import React from "react";
import Images from "next/image";
import ViewAllLink from "./ViewAllLink";
import Heading from "./Heading";
import Link from "next/link";

async function getProductData() {
  let data = await fetch("http://localhost:8000/api/v1/product/allproduct");
  let products = await data.json();
  return products;
}

const TopRatedProducts = async () => {
  let data = await getProductData();
  return (
    <div className="top-product">
      <ViewAllLink>
        <Heading>Top Rated Product</Heading>
        <p className="prdct-view">View All</p>
      </ViewAllLink>
      <div className="all-prdct">
        {data.map(
          (item, i) =>
            item.productType === "top" && (
              <div className="prdct-item" key={i}>
                <Images
                  src={`http://localhost:8000${item.image[0]}`}
                  width={313}
                  height={313}
                  style={{ borderRadius: "15px" }}
                  alt="product-img"
                />
                <div className="product-text">
                  <h4>
                    <Link href={`/product/${item.slug}`}>{item.name}</Link>
                  </h4>
                  <p>${item.price}</p>
                  <div className="star-sold">
                    <Images src={item.img2} width={15} height={15} alt="star" />
                    <span>10</span>
                  </div>
                  <div className="btn">
                    <a href="/cart">
                      <button>Add to Cart</button>
                    </a>
                    <Images
                      src="/love.png"
                      width={24}
                      height={24}
                      style={{ marginLeft: "30px" }}
                      alt="love"
                    />
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TopRatedProducts;
