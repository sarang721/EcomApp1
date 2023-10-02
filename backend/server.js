import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import path from 'path'

dotenv.config();
connectDB();

const app=express();


app.use(express.json());

app.get('/',(req,res)=>{

})


app.use('/api/orders', orderRoutes);
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes)


app.get('/api/config/paypal',(req,res)=>{
    res.json(process.env.PAYPAL_CLIENT_ID)
})



app.listen(process.env.PORT,()=>{
    console.log("Server running");
})
