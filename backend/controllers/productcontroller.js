const productmodel = require('../models/productmodel');

const createproduct = async (req, res) => {
    try {
        console.log(req.body);
        let product = await productmodel.findOne({ title: req.body.title });
        if (product) {
            return res.status(400).json({ error: "product already exist" })
        }
        let newproduct = await new productmodel(req.body);
        newproduct.save();
        return res.status(201).json({ message: "product created" })
    } catch (error) {
        return res.status(500).json({ error: "internal server error" })
    }
}

const getproducts = async (req, res) => {
    try {
        let products = await productmodel.find();
       // console.log(products);
        
        return res.status(200).json(products)
    } catch (error) {

    }
}


const getproductbyid = async (req, res) => {
    try {
        let id = req.params.id;
        let product = await productmodel.findById(id);
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ error: 'internal server error' })
    }
}


const updateproduct = async (req, res) => {
    try {
        let id = req.params.id;
        let { title, price, description, img, stock, category, } = req.body;

        let updatedproduct = await productmodel.findByIdAndUpdate({ _id: id }, { title, price, description, img, stock, category, updateAt: Date.now() })
        if (!updatedproduct) {
            return res.status(404).json({ error: "product not found" })
        }


        return res.status(200).json({ message: "product upadted" })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: 'internal server error' + error })
    }

}

const deleteproduct = async (req, res) => {
    try {
        let id = req.params.id;
        let deletedproduct = await productmodel.findByIdAndDelete(id);
        if (!deletedproduct) {
            return res.status(404).json({ error: "product not found" })
        }
        return res.status(200).json({ message: "product deleted" })
    } catch (error) {
        return res.status(500).json({ error: 'internal server error' + error })
    }
}


module.exports = { createproduct, getproducts, getproductbyid, updateproduct ,deleteproduct}