const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose')
const connectDb=require('./config/db');
connectDb()// mongodb connects function logic written in config file
const cors=require('cors');

const userroutes=require('./routes/userroutes');
const productroutes=require('./routes/productroutes');
const cartroute=require('./routes/cartroutes');
const orderroutes=require('./routes/orderroutes');
//
dotenv.config();//load all constants in dotenv file
const app=express();//

app.use(express.json());//converts data json-js or js to json
app.use(cors()); //to give access from any front end server

//routes middleware
app.use('/api',userroutes);
app.use('/api',productroutes);
app.use('/api',cartroute);
app.use('/api',orderroutes);


const port=process.env.port ||3685;

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
    
})