const cartmodel = require('../models/cartmodel');
const usermodel = require('../models/usermodel');
const productmodel = require('../models/productmodel');

const createcart = async (req, res) => {
    try {
        let { userid, productid } = req.body;

        let user = await usermodel.findById(userid);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        let product = await productmodel.findById(productid);
        if (!product) {
            return res.status(400).json({ error: "Product not found" });
        }

        let newcart = new cartmodel({ userid, productid }); // Ensure you are creating it with correct fields
        await newcart.save(); // ✅ Missing `await` fixed

        return res.status(200).json({ data: newcart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error: " + error.message });
    }
};

const getcarts = async (req, res) => {
    try {
        let carts = await cartmodel.find(); // Retrieve all cart entries

        let cartData = await Promise.all(
            carts.map(async (cart) => {
                let userDetails = await usermodel.findById(cart.userid); // ✅ Fix incorrect field reference
                let productDetails = await productmodel.findById(cart.productid); // ✅ Fix incorrect field reference

                if (!userDetails || !productDetails) return null;

                return {
                    username: userDetails.username,
                    email: userDetails.email,
                    title: productDetails.title,
                    price: productDetails.price,
                    description: productDetails.description,
                    userid:cart.userid,
                    productid:cart.productid,
                    _id:cart._id
                };
            })
        );

        return res.status(200).json(cartData.filter(Boolean)); // ✅ Ensures null values are removed
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};



const getcartsByuser = async (req, res) => {
    try {
        let userid=req.params.userid;
        let carts = await cartmodel.find({userid:userid}); 

        let cartData = await Promise.all(
            carts.map(async (cart) => {
                let userDetails = await usermodel.findById(cart.userid); // ✅ Fix incorrect field reference
                let productDetails = await productmodel.findById(cart.productid); // ✅ Fix incorrect field reference

                if (!userDetails || !productDetails) return null;

                return {
                    username: userDetails.username,
                    email: userDetails.email,
                    title: productDetails.title,
                    price: productDetails.price,
                    description: productDetails.description,
                    userid:cart.userid,
                    img:userDetails.img,
                    productid:cart.productid,
                    _id:cart._id
                };
            })
        );

        return res.status(200).json(cartData.filter(Boolean)); // ✅ Ensures null values are removed
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};

const upadtecart=async(req,res)=>{
    try {
        let cartid=req.params.cartid;
        let upadetedcart=await cartmodel.findByIdAndUpdate(cartid,req.body);
        if(!upadetedcart){
            return res.status(400).json({ error: "cart not found" });
        }
        return res.status(200).json({message:"cart updated"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
}
const deletecart = async (req, res) => {
    try {
        let id = req.params.id;
        let deletedcart = await cartmodel.findByIdAndDelete(id);
        if (!deletedcart) {
            return res.status(404).json({ error: "cart not found" })
        }
        return res.status(200).json({ message: "cart deleted" })
    } catch (error) {
        return res.status(500).json({ error: 'internal server error' + error })
    }
}
module.exports = { createcart, getcarts ,getcartsByuser,upadtecart,deletecart};
