const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();


mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("DB CONNECTED")
});



const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("App is running at port 3000")
})

