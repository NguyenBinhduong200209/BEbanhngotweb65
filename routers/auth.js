import express from 'express';
import mongoose from 'mongoose';
import { userModel } from '../model/auth.js';
import jwt from 'jsonwebtoken';


const JWT_SECRET ="MY_SECRET_KEY"

const authRouter =express.Router();

//sign
authRouter.post("/usersign", async (req, res) => {
  console.log(req.body);
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    if (!email || !password || !firstName || !lastName || !confirmPassword) {
      res.send({ message: "Bạn phải điền đầy đủ thông tin",alert: false });
    } else {
      const result = await userModel.findOne({ email });
      if (result) {
        res.send({ message: "Email đã tồn tại", alert: false });
      } else if (password !== confirmPassword) {
        res.send({ message: "Mật khẩu chưa khớp ! Hãy kiểm tra lại !",alert: false });
      } else {
        const token = jwt.sign(
          {
            email,
            password,
          },
          JWT_SECRET,
          {
            expiresIn: "10000h",
          }
        );
        const data = new userModel(req.body,token);
        await data.save();
        res.send({
          message: "Đăng kí thành công",
          alert: true,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Lỗi server" });
  }
});

  //API Login
  authRouter.post("/userlogin", async (req, res) => {
    
    const data = req.body;
    const {email,password} = req.body;
    try {
      const token = jwt.sign(
        {
          email,
          password,
        },
        JWT_SECRET,
        {
          expiresIn: "3h",
        }
      );
      const result = await userModel.findOne({ email, password });
      if (result) {
        const dataSend = {
          token:token,
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        console.log(dataSend);
        res.send({
          message: "Đăng nhập thành công",
          
          alert: true,
          data: dataSend
        });
        console.log(token);
      } else {
        res.send({ message: "Sai email hoặc tài khoản !,", alert: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Lỗi server" });
    }
  });
  export default authRouter;