import express from "express";
import expressAsyncHandler from "express-async-handler";
const router = express.Router();
import Product from "../models/productModel.js";

//fetch all products
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

//get each product
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
    //products.find((p) => p._id == req.params.id);
    // res.json(product);
  })
);

export default router;
