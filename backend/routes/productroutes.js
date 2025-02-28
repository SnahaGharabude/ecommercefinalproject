const express=require('express');
const { createproduct, getproducts ,getproductbyid,updateproduct,deleteproduct}=require('../controllers/productcontroller')
const routes=express.Router()


//routes
routes.post('/products',createproduct);
routes.get('/products',getproducts);
routes.get('/products/:id',getproductbyid);
routes.put('/products/:id',updateproduct);
routes.delete('/products/:id',deleteproduct)


module.exports=routes