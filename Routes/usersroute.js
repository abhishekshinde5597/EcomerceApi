import express from 'express'
const router = express.Router();
import usermodel from '../model/users.js';
import { jwtverify, jwtverifyandauthentication, verifyTokensandisAdmin } from '../Routes/verifytoken.js'

//update user
router.put("/:id", jwtverifyandauthentication, async(req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await usermodel.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete user
router.delete('/delete/:id', jwtverifyandauthentication, async(req, res) => {
    try {
        await usermodel.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
});

//get all users

router.get('/users', verifyTokensandisAdmin, async(req, res) => {

    try {
        const getallusers = await usermodel.find()
        res.status(200).json(getallusers);
    } catch (err) {
        res.status(500).json(err);
    }


});

//get user by id


router.get('/:id', verifyTokensandisAdmin, async(req, res) => {

    try {
        const getuserbyid = await usermodel.findById(req.params.id)
        res.status(200).json(getuserbyid);
    } catch (err) {
        res.status(500).json(err);
    }


});

export default router;