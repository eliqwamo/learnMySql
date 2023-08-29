import express from "express";
const router = express.Router();


//CRUD - Create Read Update Delete
//HTTP Methods - post get put delete

router.get("/sayHello", (req,res) => {

    return res.status(200).json({
        msg: "Hello from API server"
    })

})


router.post("/createNewProduct", (req,res) => {})
router.delete("/removeProduct", (req,res) => {})
router.put("/updateProduct", (req,res) => {})
router.get("/getProduct", (req,res) => {})


export default router;