const mongoose=require('mongoose');

const cartschema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('cart',cartschema)