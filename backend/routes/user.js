const express = require("express");

const router = express.Router()

const { getUserByID, getUser } = require("../controllers/user");
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth");

router.param("userId", getUserByID);


router.get("/user/:userId", isAuthenticated, isSignedIn, getUser);



module.exports = router
