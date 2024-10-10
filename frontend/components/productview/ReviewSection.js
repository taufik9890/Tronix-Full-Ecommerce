"use client";
import React, { useState } from "react";
import Images from "next/image";
import { commentData, productReviewTitleData } from "@/data/productData";

const ReviewSection = () => {
  const [active, setActive] = useState(0);
  const [activeBox, setActiveBox] = useState(0);

  const handleActive = (i) => {
    setActive(i);
    setActiveBox(i);
  };
  return (
    <div className="review-part">
      <div className="review-tag">
        {productReviewTitleData.map((item, i) => (
          <p
            className={activeBox === i ? "active-review-link" : "review-link"}
            key={i}
            onClick={() => handleActive(i)}
          >
            {item.title}
          </p>
        ))}
      </div>
      {active === 0 && (
        <div className="comment-list">
          {commentData.map((item, i) => (
            <div className="tag-comment" key={i}>
              <div className="cmnt-element">
                <div className="cmnt-img-rate">
                  <div className="img">
                    <Images
                      src={item.img}
                      width={56}
                      height={56}
                      alt="comment-img"
                    />
                  </div>
                  <div className="review-text">
                    <h4>{item.cmntname}</h4>
                    <div className="rating">
                      <p>{item.reviewrate}</p>
                      <Images
                        src={item.cmntrateimg}
                        width={100}
                        height={20}
                        alt="review"
                      />
                      <p className="rate-timing">{item.time}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="cmnt">{item.cmnt}</p>
            </div>
          ))}
        </div>
      )}
      {active === 1 && <div>Description</div>}
      {active === 2 && <div>Discussion</div>}
      {active === 3 && <div>Gift Cards</div>}
    </div>
  );
};

export default ReviewSection;
