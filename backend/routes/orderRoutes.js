import express from "express";
const router=express.Router();
import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler';
import {admin, protect} from '../middleware/authMiddleware.js'

router.post('/',protect,asyncHandler(async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      } = req.body
    
      if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error();
        return
      } else {
        const order = new Order({
          orderItems,
          user: req.user._id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
        })
    
        const createdOrder = await order.save()
    
        res.status(201).json(createdOrder)
    }

}))

//get all orders
router.get('/',protect,admin,asyncHandler(async(req,res)=>{

  const data=await Order.find({}).populate('user','id name')

  res.json(data);


}))


//get my order
router.get('/myorders',protect,asyncHandler(async(req,res)=>{

    const data=await Order.find({user:req.user._id})

    res.json(data);
 

}))






router.get('/:id',protect,asyncHandler(async(req,res)=>{

    const order=await Order.findById(req.params.id).populate('user','name email');

    if(order)
    res.json(order);
    else{
    res.status(404);
        throw new Error();
    }
   

}))


//Pay the order
router.put('/:id/pay',protect,asyncHandler(async(req,res)=>{

  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error()
  }

}))




//update order to delivered
router.put('/:id/deliver',protect,admin,asyncHandler(async(req,res)=>{

  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()


    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error()
  }

}))









export default router;