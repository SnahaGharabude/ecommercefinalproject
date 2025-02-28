const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        let { email, username, password, phnno } = req.body
        let existinguser = await usermodel.findOne({ email: email })
        if (existinguser) {
            return res.status(400).json({ message: "user already exist" })
        }
        console.log(password);
        
        let hashedpwd = await bcrypt.hash(password, 10);


        let newuser = await new usermodel({ email, username, phnno, password: hashedpwd });
        newuser.save();
        return res.status(201).json({ message: 'user created' })
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' })
    }
}

const getallusers = async (req, res) => {
    try {
        let users = await usermodel.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' })
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log(password);
        
        let user = await usermodel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        let ismatch =  bcrypt.compare(user.password, password)
        if (!ismatch) {
            return res.status(400).json({ error: "password not matching" });
        }
        return res.status(200).json({ data:user});
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' })
    }
}

const updateuser = async (req, res) => {
    try {
        let emailcilent = req.params.email;
        let { username, phnno, password } = req.body;
        console.log('email');
        console.log('test');
        
        let updateduser = await usermodel.findOneAndUpdate({ email: emailcilent }, req.body)
        if (!updateduser) {
            return res.status(404).json({ error: "user not found" })
        }
        console.log('test2');
        
        return res.status(200).json({ message: "user upadted" })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ error: 'internal server error'+error })
    }

}

module.exports = { register, getallusers, login, updateuser }