import express from "express";
import mongoose, { now } from "mongoose";
import { productModel } from "../model/product.js";
// import authMiddleware from "../middlewares/auth.js";`
import jwt from 'jsonwebtoken';
import authMiddleware from "../middlewares/auth.js";

const JWT_SECRET ="MY_SECRET_KEY"
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const data = productModel(req.body);
    const datasave = await data.save();
    res.send({
      message: " Thêm thành công !",
    });
  } catch (error) {}
});

router.delete("/", async (req, res) => {
  console.log(req.body);
  try {
    const data = productModel(req.body);
    const deletedProduct = await productModel.findOneAndDelete({
      name: req.body.name,
      category: req.body.category,
    });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Không tim thấy sản phẩm !" });
    }

    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/", async (req, res) => {
  console.log(req.body);
  try {
    const data = productModel(req.body);
    const updateProduct = await productModel.findOneAndUpdate({
      name: req.body.name,
      category:req.body.category
    }, req.body, {new: true});
    if (!updateProduct) {
      return res.status(404).json({ message: "Không tim thấy sản phẩm !" });
    }

    res.json({ message: "Sửa thông tin  sản phẩm thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    
      const data = await productModel.find();
      
      res.json(data);

    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
});

export default router;
