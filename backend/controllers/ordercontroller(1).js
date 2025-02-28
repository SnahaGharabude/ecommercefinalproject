const ordermodel = require('../models/ordermodel');
const usermodel = require('../models/usermodel');
const productmodel = require('../models/productmodel');

const createorder = async (req, res) => {
    try {
        let userid = req.params.userid; // or req.body.userid
        let { products, shippingadd, payment } = req.body;

        console.log(req.body);

        
        const pricePromises = products.map(async (product) => {
            console.log("product id", product.productid);
            let currentProduct = await productmodel.findById(product.productid);
            return currentProduct.price * product.quantity;
        });

       
        let totalAmounts = await Promise.all(pricePromises);
        let totalamount = totalAmounts.reduce((acc, price) => acc + price, 0);

        console.log("total", totalamount);

        
        let neworder=await new ordermodel({products,shippingadd,payment,userid,totalamount})
        neworder.save();
        return res.status(200).json({message:"order success"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error: " + error.message });
    }
}

const getAllOrders = async (req, res) => {
    try {
        let orders = await ordermodel.find().populate("userid").populate("products.productid");
        return res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error: " + error.message });
    }
};
const getOrderById = async (req, res) => {
    try {
        let orderId = req.params.orderId;
        let order = await ordermodel.findById(orderId).populate("userid").populate("products.productid");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ order });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error: " + error.message });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        let orderId = req.params.orderId;
        let { status } = req.body;

        let updatedOrder = await ordermodel.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ message: "Order status updated", updatedOrder });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error: " + error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        let orderId = req.params.orderId;
        let deletedOrder = await ordermodel.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error: " + error.message });
    }
};

module.exports = { createorder,getAllOrders,getOrderById,updateOrderStatus,deleteOrder };
