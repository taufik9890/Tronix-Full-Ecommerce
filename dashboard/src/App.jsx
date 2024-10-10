import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Registration from "./pages/authentication/registration";
import Login from "./pages/authentication/Login";
import EmailVerification from "./pages/authentication/EmailVerification";
import ForgetPassword from "./pages/authentication/ForgetPassword";
import NewPassword from "./pages/authentication/NewPassword";
import OtpVerification from "./pages/authentication/OtpVerification";
import Dashboard from "./pages/dashboard";
import AddProduct from "./pages/product/AddProduct";
import AddCategory from "./pages/category/AddCategory";
import AddSubCategory from "./pages/subcategory/AddSubCategory";
import ViewCategory from "./pages/category/ViewCategory";
import ViewSubCategory from "./pages/subcategory/ViewSubCategory";
import ViewProduct from "./pages/product/ViewProduct";
import AddFlashSale from "./pages/product/AddFlashSale";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/registration" index element={<Registration />} />
        <Route path="/login" index element={<Login />} />
        <Route path="/verification/:email" element={<EmailVerification />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/newpassword/:token" element={<NewPassword />} />
        <Route path="/otp/:email" element={<OtpVerification />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="addflashsale" element={<AddFlashSale />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="addsubcategory" element={<AddSubCategory />} />
          <Route path="viewcategory" element={<ViewCategory />} />
          <Route path="viewsubcategory" element={<ViewSubCategory />} />
          <Route path="viewproduct" element={<ViewProduct />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
