import React from "react";
import ViewAllLink from "./ViewAllLink";
import Heading from "./Heading";
import Images from "next/image";
import { collection } from "@/data/homeData";

async function getCategoryData() {
  let data = await fetch("http://localhost:8000/api/v1/product/allproduct");
  let products = await data.json();
  return products;
}

const FeatureProduct = async () => {
  let data = await getCategoryData();
  return (
    <div className="collection-part">
      <div className="coll-item">
        <div className="item-1">
          <h3>Best Collection</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          <a href="#">
            <button>Shop Now</button>
          </a>
        </div>
        <div className="item-head">
          <ViewAllLink>
            <Heading>Featured Products</Heading>
            <p className="coll-text">View All</p>
          </ViewAllLink>
          <div className="item-2">
            {data.map(
              (item, i) =>
                item.productType === "featured" && (
                  <div className="item-details" key={i}>
                    <div className="item-img-tag">
                      <Images
                        src={`http://localhost:8000${item.image[0]}`}
                        width={376}
                        height={333}
                        alt="collection-img"
                      />
                      <div className="sold-tag">
                        <p>{item.productType}</p>
                        <p className="coll-discount">-10% Off</p>
                      </div>
                      {/* <span className='coll-discount2'>{item.tagout}</span> */}
                    </div>
                    <div className="flash-sec-text">
                      <h3>{item.name}</h3>

                      <p>
                        {item.discount ? (
                          <>
                            <span className="ban-num">
                              <del>${item.price}</del>
                              <span className="divide">-</span>
                            </span>
                            <span className="current-num">
                              ${item.price - item.discount}
                            </span>
                          </>
                        ) : (
                          <span className="current-num">${item.price}</span>
                        )}
                      </p>
                    </div>
                    <div className="add-cart">
                      <a href="/pages/cart">
                        <button>Add to cart</button>
                      </a>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
