import express from "express";
import functions from './functions.js';
import database from "./database.js";

const app = express();

app.use(express.urlencoded())
app.use(express.json())

const port = 3001;

app.use('/api',functions);


database
.sync()
.then(result => {
    app.listen(port, () => {
        console.log(`Server is running via port ${port}`)
    })
})
.catch(error => {
    console.log(error)
})


