const express=require('express');
const { register, getallusers, login, updateuser }=require('../controllers/authcontroller');
const routes=express.Router()

//routes
routes.post('/register',register);
routes.get('/getall',getallusers);
routes.post('/login',login);
routes.put('/updateuser/:email',updateuser);

module.exports=routes