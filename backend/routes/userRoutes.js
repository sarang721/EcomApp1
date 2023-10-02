import express from "express";
const router=express.Router();
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js'
import {protect,admin} from '../middleware/authMiddleware.js'



//get all users
router.get('/',protect,admin,asyncHandler(async(req,res)=>{

    const data=await User.find({});
    res.json(data)
}))


router.post('/login',asyncHandler(async(req,res)=>{
        const {email,password}=req.body;

        const user=await User.findOne({email:email});

        if(user && (await user.matchPassword(password)))
        {
                res.json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token:generateToken(user._id)
                })
        }
        else{
            res.status(404);
            throw new Error();
        }
}))


router.get('/profile',protect,asyncHandler(async(req,res)=>{

    const user=await User.findById(req.user._id);

    if(user)
    {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,

        })
    }
    else{
    res.status(404);
        throw new Error();
    }
}

))




router.post('/',asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;

    const userExists=await User.findOne({email});

    if(userExists)
    {
        res.status(400)
        throw new Error();
    }
    
    const user=await User.create({
        name,
        email,
        password
    })

    if(user)
    {
        res.status(201).json({

            _id:user._id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token:generateToken(user._id)

        })
        
    }
    else    
    {
        res.status(400);
        throw new Error();
    }

}))


export default router;