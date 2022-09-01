import express from 'express'
import usermodel from '../model/users.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
// import { jwtverify, jwtverifyandauthentication } from './Routes/verifytoken.js'
const router = express.Router();

//Register 

router.post('/auth', async(req, res) => {

    const newUser = new usermodel({

        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, 'rohan0906').toString()
    })
    try {
        const saveduser = await newUser.save();
        res.status(201).json(saveduser);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Login
router.post('/login', async(req, res) => {

    try {

        const user = await usermodel.findOne({ username: req.body.username });

        !user && res.status(401).json("wrong credencials")

        //=========== Dycrypt password=====================
        const hashpassword = CryptoJS.AES.decrypt(user.password, 'rohan0906');

        const originalpassword = hashpassword.toString(CryptoJS.enc.Utf8);

        originalpassword !== req.body.password && res.status(401).json("wrong credencilas")

        // ===========Generate JWT Token=====================
        const accesstoken = jwt.sign({

                id: user._id,
                isAdmin: user.isAdmin
            },
            'rohan0906', { expiresIn: "3d" }
        );

        // ============display user information expect password=========
        const { password, ...others } = user._doc;

        res.status(200).json({ others, accesstoken });

    } catch (error) {
        res.status(500).json(error);

    }

})



export default router