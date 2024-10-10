"use client";
import React from "react";
import { reviewForm } from "@/helpers/validation/Yup";
import { useFormik } from "formik";
import GoldenStar from "@/public/assets/svg/goldenstar";
import SilverStar from "@/public/assets/svg/silverstar";

const ReviewForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      comment: "",
    },
    validationSchema: reviewForm,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { errors, touched } = formik;
  return (
    <div className="review-form-part">
      <div className="form-text">
        <h4>Add Your Review</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.{" "}
        </p>
      </div>
      <div className="form-part">
        <form onSubmit={formik.handleSubmit}>
          <label>Name*</label>
          <input
            type="text"
            onChange={formik.handleChange}
            name="name"
            value={formik.values.name}
          />
          {errors.name && touched.name && (
            <p className="cmnt-errors">{errors.name}</p>
          )}

          <label>Email*</label>
          <input
            type="email"
            onChange={formik.handleChange}
            name="email"
            value={formik.values.email}
          />
          {errors.email && touched.email && (
            <p className="cmnt-errors">{errors.email}</p>
          )}

          <label>Comment*</label>
          <textarea
            type="text"
            onChange={formik.handleChange}
            name="comment"
            value={formik.values.comment}
          />
          {errors.comment && touched.comment && (
            <p className="cmnt-errors">{errors.comment}</p>
          )}

          <div className="form-rating">
            <p>Rating</p>
            <div>
              <GoldenStar />
              <GoldenStar />
              <GoldenStar />
              <GoldenStar />
              <SilverStar />
            </div>
          </div>

          <div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
