const mongoose=require('mongoose');

const productschema=mongoose.Schema({
    title:{type:String},
    price:{type:Number},
    description:{type:String},
    img:{type:String},
    stock:{type:Number},
    category:{type:String},
    createdAt:{type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('products',productschema)