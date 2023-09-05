import express from "express";
const router = express.Router();
import bcryptjs from "bcryptjs";

import ProductsTable from './models/products.js';
import AccountsTable from './models/account.js';

//CRUD - Create Read Update Delete
//HTTP Methods - post get put delete

router.get("/sayHello", (req,res) => {
    return res.status(200).json({
        msg: "Hello from API server"
    })
})



router.post("/register", (req, res) => {

    //Get the user data from postman /request
    const {user} = req.body;

    //Check if email exist 
    AccountsTable.findAll({where: {email: user.email}})
    .then(async results => {

        if(results.length == 0){
            //Handle password
            const hash = await bcryptjs.hash(user.password, 10);
            //Generate verify code
            const code = generateRandomIntegerInRange(1000,9999);
            //Create the user

            AccountsTable.create({
                email: user.email,
                password: hash,
                firstName: user.firstName,
                lastName: user.lastName,
                isApproved: false,
                verifyCode: code
            })
            .then(account_created => {
                return res.status(200).json({
                    results: account_created
                })
            })
            .catch(error => {
                return res.status(500).json({
                    error: error
                })
            })
        } else {
            return res.status(401).json({
                results: 'This email is not available'
            })
        }
    })
    .catch(error => {
        return res.status(500).json({
            error: error
        })
    })
})


router.post("/verify", (req,res) => {
    const code = req.body.code;
    const email = req.body.email;
    AccountsTable.findAll({where: {email: email}})
    .then(async results => {
        if (results.length == 0) {
            return res.status(401).json({
                results: 'This email is not exist'
            })
        } else {
            const account = results[0];
            if(parseInt(code) === parseInt(account.verifyCode)){
                account.isApproved = true;
                account.save()
                return res.status(200).json({
                    results: account
                })
            } else {
                return res.status(401).json({
                    results: 'The verify code is not match'
                })
            }
        }
    })
    .catch(error => {
        return res.status(500).json({
            error: error
        })
    })

})

router.post("/login", (req,res) => {

    const password = req.body.password;
    const email = req.body.email;

    AccountsTable.findAll({where: {email: email}})
    .then(async results => {
        if (results.length == 0) {
            return res.status(401).json({
                results: 'This email is not exist'
            })
        } else {
            const account = results[0];
            if(account.isApproved){

                const isMatch = await bcryptjs.compare(password, account.password);
                if(isMatch){
                    return res.status(200).json({
                        results: `Welcome back ${account.firstName}`
                    })
                } else {
                    return res.status(401).json({
                        results: 'Password not match'
                    })
                }
            } else {
                return res.status(401).json({
                    results: 'Your account was not verified yet'
                })
            }
        }
    })
    .catch(error => {
        return res.status(500).json({
            error: error
        })
    })
})



function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post("/createNewProduct", (req,res) => {

    const {product} = req.body;

    ProductsTable.create({
        productBrand: product.productBrand,
        productName: product.productName,
        productPrice: product.productPrice,
        unitInStock: product.unitInStock,
        productImage: product.productImage,
        isPublished: product.isPublished
    })
    .then(new_product => {
        return res.status(200).json({
            x: new_product
        })
    })
    .catch(error => {
        return res.status(500).json({
            x: error
        })
    })

    

})



router.delete("/removeProduct", (req,res) => {})
router.put("/updateProduct", (req,res) => {})
router.get("/getProduct", (req,res) => {})


export default router;