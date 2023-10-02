import express from "express";
const router=express.Router();
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler';
import { protect,admin } from "../middleware/authMiddleware.js";
import multer from 'multer';
import AWS from 'aws-sdk';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const upload = multer({ dest: "uploads/" });

const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region:'us-east-1'
});


//fetch all products
// /api/products
router.get('/',asyncHandler(async(req,res)=>{
    const products=await Product.find({})
    res.json(products)
}))


//fetch product by id
// /api/products/:id
router.get('/:id',asyncHandler(async(req,res)=>{

    const product=await Product.findById(req.params.id)

    if(product)
    res.json(product);
    else
    res.status(404).json({'message':"Product not found"})

}))

//delete product
router.delete('/:id',asyncHandler(async(req,res)=>{

    const product=await Product.findById(req.params.id)

    if(product){
        await product.remove();
    res.json({message:"product removed"})
    }
    else
    res.status(404).json({'message':"Product not found"})

}))

router.post("/uploadfile", protect, admin, upload.single("file"), protect, async (req, res) => {
    var file = req.file;
    try {
      const uploadFile = (file) => {
        const fileStream = fs.createReadStream(file.path);
        const params = {
          Bucket: "ecomproducts1",
          Key: `products/${req.user._id}/${file.originalname}`,
          Body: fileStream,
        };
        s3.upload(params, () => {});
      };
      uploadFile(file);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(400).json({
        message: "Problem Occured while Uploading",
      });
    }
  });



//create product
router.post('/',protect,admin,asyncHandler(async(req,res)=>{

    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
      } = req.body

    const product = new Product({
        name: name,
        price: price,
        user: req.user._id,
        image: image,
        brand: brand,
        category: category,
        countInStock: countInStock,
        rating:5,
        numReviews: 0,
        description: description,
      })
    
      const createdProduct = await product.save()
      res.status(201).json(createdProduct)

}))


export default router;