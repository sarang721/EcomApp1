import express from "express";
const router=express.Router();
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler';
import { protect,admin } from "../middleware/authMiddleware.js";


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