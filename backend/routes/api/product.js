const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addProductController,
  viewProductController,
  singleProductController,
  flashSaleController,
  getFlashSaleTimeController,
} = require("../../controllers/productController");
const {
  addCategoryController,
  viewCategoryController,
  approveCategoryController,
  deleteCategoryController,
  editCategoryController,
} = require("../../controllers/categoryController");
const {
  addSubCategoryController,
  viewSubCategoryController,
  deleteSubCategoryController,
  approveSubCategoryController,
  singleSubCategoryController,
} = require("../../controllers/subcategoryController");
const {
  getCartController,
  addToCartController,
} = require("../../controllers/cartController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/*-------------------------------------------------------------------
                  Products Controllers Start
--------------------------------------------------------------------*/
router.post("/createproduct", upload.array("photos", 12), addProductController);
router.get("/allproduct", viewProductController);
router.get("/singleproduct/:slug", singleProductController);
router.post("/flashsale", flashSaleController);
router.get("/allflashsaletime", getFlashSaleTimeController);

/*-------------------------------------------------------------------
                  Cart Controllers Start
--------------------------------------------------------------------*/
router.post("/cart", addToCartController);
router.get("/allcart", getCartController);

/*-------------------------------------------------------------------
                  Category Controllers Start
--------------------------------------------------------------------*/
router.post("/createcategory", upload.single("avatar"), addCategoryController);
router.get("/allcategory", viewCategoryController);
router.post("/approvecategory", approveCategoryController);
router.delete("/deletecategory/:id", deleteCategoryController);
router.post("/editcategory", editCategoryController);

/*-------------------------------------------------------------------
                  Sub-Category Controllers Start
--------------------------------------------------------------------*/
router.post(
  "/createsubcategory",
  upload.single("avatar"),
  addSubCategoryController
);
router.get("/allsubcategory", viewSubCategoryController);
router.post("/approvesubcategory", approveSubCategoryController);
router.delete("/deletesubcategory/:id", deleteSubCategoryController);
router.get("/singlesubcategory/:id", singleSubCategoryController);

module.exports = router;
