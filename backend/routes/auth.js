const express = require("express");

const router = express.Router()
const {check} = require("express-validator");

const { signout, signup, signin, isSignedIn } = require("../controllers/auth");


router.post('/signup', [
    check("name", "Name should be at least three character").isLength({min: 3}),
    check("email", "Provide valid email").isEmail(),
    check("password", "Password should be at least three character").isLength({min: 3})
], signup);


router.post('/signin', [
    check("email", "Provide valid email").isEmail(),
    check("password", "Password should be at least three character or password is required").isLength({min: 3})
], signin);



router.get("/signout", signout)

router.get("/test", isSignedIn, (res, req) => {
    res.send(req.auth);
});

module.exports = router;
