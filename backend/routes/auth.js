const express = require("express");

const router = express.Router()
const {check} = require("express-validator");

const { signout, signup } = require("../controllers/auth");


router.post('/signup', [
    check("name", "Name should be at least three character").isLength({min: 3}),
    check("email", "Provide valid email").isEmail(),
    check("password", "Password should be at least three character").isLength({min: 3})
], signup);
router.get("/signout", signout)

module.exports = router;
