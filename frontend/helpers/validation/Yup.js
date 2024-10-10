import * as Yup from "yup";

export const reviewForm = Yup.object({
  name: Yup.string().min(4).max(25).required("Please Enter Your Name"),
  email: Yup.string().nullable().email().required("Please Enter Your Email"),
  comment: Yup.string().required("Please write your comment"),
});

export const leaveComment = Yup.object({
  name: Yup.string().min(4).max(25).required("Please Enter Your Name"),
  email: Yup.string().nullable().email().required("Please Enter Your Email"),
  comment: Yup.string().required("Please write your comment"),
});
