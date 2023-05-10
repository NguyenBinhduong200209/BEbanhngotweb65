import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import products from './routers/products.js'
import authRouter from './routers/auth.js'
 
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8000;

const result = dotenv.config();
if (result.error) {
  console.error(result.error);
}


console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use("/signup", authRouter);
app.use("/login", authRouter);



app.use('/product', products)

app.listen(PORT, () =>
  console.log(`Server is running at: http://localhost:${PORT}`)
);