import express from 'express';
const router = express.Router();
import usermodel from '../model/users.js';

import CryptoJS from 'crypto-js';

router.post('/auth', (req, res) => {


    const user = usermodel.findOne({ email: req.body.email })

    !user && res.status(401).json("wrong credencilas")

    //=========== Dycrypt password=====================
    const hashpassword = CryptoJS.AES.decrypt(user.password, 'rohan0906');
    const originalpassword = hashpassword.toString(CryptoJS.enc.Utf8);
    originalpassword !== req.body.password && res.status(401).json("wrong credencilas")

    res.status(200).json(user);
    // const decipher = crypto.createDecipher(alg, key);
    // const decrypt = decipher.update(req.body.password, 'hex', 'utf8') + decipher.final('utf8');
    // const originalpassword = decrypt.toString(CryptoJS.enc.Utf8);

    // if (originalpassword == req.body.password) {
    //     res.status(200).json(user)
    // } else {
    //     res.send("password not matched")
    // }
})


export default router;