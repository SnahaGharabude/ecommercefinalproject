const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    phnno:{type:Number},
    email:{type:String,
           require:true,
           unique:true
          },
    role:{type:String,
        enum:["admin","user"],
        default:"user"
      
    },
    createdAt:{type:Date,default:Date.now()}
})

module.exports=mongoose.model("users",userschema);