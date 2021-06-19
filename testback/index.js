// import express
const express = require("express");

// create instance
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = 3000;

// app.use(bodyParser.json());
app.use(cors);
app.use(cookieParser())

const admin = (req, res) => {
    return res.send("this is admin page")
}


// while using curly braces return is necessary
// in req and res order is necessary
app.get('/', (req, res) => {
    return res.send("Hello world!");
});

const isAdmin = (req, res, next) => {
    console.log("is admin is running")
    next();
}

app.get("/admin", isAdmin, admin);

app.get('/login', (req, res) => {
    return res.send("you are visiting login route");
})

app.listen(port, () => {
    console.log(`Example app running on port ${port}`);
})
