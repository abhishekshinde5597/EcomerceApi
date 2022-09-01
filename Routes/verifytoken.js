import express from 'express'
import jwt from 'jsonwebtoken';

const jwtverify = (req, res, next) => {

    const jwtheader = req.headers.token
    if (jwtheader) {
        const token = jwtheader.split(" ")[1];
        jwt.verify(token, 'rohan0906', (err, user) => {

            if (err)
                res.status(402).json("Your Token is not valid!")
            req.user = user
            next();
        })

    } else {

        return res.status(401).json("You are not authenticated!")
    }
};

const jwtverifyandauthentication = (req, res, next) => {

    jwtverify(req, res, () => {

        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("you are not allowded to do that")
        }
    })
}

const verifyTokensandisAdmin = (req, res, next) => {
    jwtverify(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not admin ");
        }
    })
}


export { jwtverify, jwtverifyandauthentication, verifyTokensandisAdmin }