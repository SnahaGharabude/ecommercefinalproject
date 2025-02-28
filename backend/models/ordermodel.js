const mongoose=require('mongoose');

const orderschema=mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    products:[
          {
            productid:{type:mongoose.Schema.Types.ObjectId,
                ref:"products"
            },
            quantity:{
                type:Number,
            }
          }
    ],
    orderdate:{
        type:Date,
        default:Date.now()
    },
    shippingadd:{
        type:String
    },
    totalamount:{
        type:Number
    },
    status:{
        type:String,
        enum:["pending","shipped","delivered","cancelled"],
        default:"pending"
    },
    payment:{
        type:String,
        enum:["cash","credit card","upi payment","net banking","debit card"]
    }
})

module.exports=mongoose.model('orders',orderschema);