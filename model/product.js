import mongoose from "mongoose";


 const schemaProduct =mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price:String,
    description:String,
  })
 export const productModel = mongoose.model('product',schemaProduct)
