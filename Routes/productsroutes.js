import express from 'express';
const router = express.Router();
import productmodel from '../model/products.js';

import { verifyTokensandisAdmin, jwtverifyandauthentication, jwtverify } from '../Routes/verifytoken.js'

//===Add product===========================================
router.post('/product', verifyTokensandisAdmin, async(req, res) => {
    const Product = new productmodel(req.body);
    try {
        const savedproducts = await Product.save();
        res.status(201).json(savedproducts);
    } catch (err) {
        res.status(500).json(err);
    }
})


////===update product==========================================

router.post('/:id', verifyTokensandisAdmin, async(req, res) => {

    try {
        const updatedproduct = await productmodel.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedproduct);
    } catch (err) {
        res.status(500).json(err);
    }


});

//===Delete product==========================================
router.delete('/:id', verifyTokensandisAdmin, async(req, res) => {
        try {
            await productmodel.findByIdAndDelete(req.params.id)
            res.status(200).json("Deleted Successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    })
    //===find only one product==========================================
router.get('/:id', verifyTokensandisAdmin, async(req, res) => {

    try {
        const productbyid = await productmodel.findById(req.params.id)
        res.status(200).json(productbyid);
    } catch (err) {
        res.status(500).json(err);
    }


});
//===get all products==========================================

router.get('/products', verifyTokensandisAdmin, async(req, res) => {

    try {
        const updatedproduct = await productmodel.find()
        res.status(200).json(updatedproduct);
    } catch (err) {
        res.status(500).json(err);
    }


});

export default router