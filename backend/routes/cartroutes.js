const express=require('express');
const { createcart, getcarts, getcartsByuser, upadtecart, deletecart }=require('../controllers/cartcontroller')
const routes=express.Router()


//routes
routes.post('/cart',createcart);
routes.get('/cart',getcarts);
routes.get('/cart/:userid',getcartsByuser);
routes.put('/cart/:cartid',upadtecart);
routes.delete('/cart/:id',deletecart)


module.exports=routes