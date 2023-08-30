import express from "express";
const router = express.Router();

import ProductsTable from './models/products.js';

//CRUD - Create Read Update Delete
//HTTP Methods - post get put delete

    //OPTION 1
    // const brand = req.body.productBrand;
    // const price = req.body.productPrice;
    // const stock = req.body.unitInStock;
    // const image = req.body.productImage;
    // const isPub = req.body.isPublished;
    // const name = req.body.productName;

    //OPTION 2
    // const {
    //     productBrand, 
    //     productPrice, 
    //     unitInStock,
    //     productImage,
    //     isPublished,
    //     productName} = req.body;

    //OPTION 3

router.get("/sayHello", (req,res) => {

    return res.status(200).json({
        msg: "Hello from API server"
    })

})


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