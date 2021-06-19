// import express
const express = require("express");

// create instance
const app = express();

const port = 3000;


// while using curly braces return is necessary
// in req and res order is necessary
app.get('/', (req, res) => {
    return res.send("Hello world!");
});

app.get('/login', (req, res) => {
    return res.send("you are visiting login route");
})

app.listen(port, () => {
    console.log(`Example app running on port ${port}`);
})
