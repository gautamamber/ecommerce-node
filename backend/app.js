const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv").config();
const app = express(); 
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


// project imports
const authRoutes = require("./routes/auth")


// port
const port = 3000;

// middlewares
app.use(bodyParser.json());
// app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser())

// routes



// mongo db
mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("DB CONNECTED")
});


app.use("/api", authRoutes);

app.get('/', (req, res) => {
    return res.send("Hello world!")
});

// const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("App is running at port 3000")
})
