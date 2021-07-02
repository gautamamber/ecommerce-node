const express = require("express");

const router = express.Router()

const { getUserByID, getUser, updateUser, userPurchaseList } = require("../controllers/user");
const {isAdmin, isAuthenticated, isSignedIn, getAllUsers} = require("../controllers/auth");

router.param("userId", getUserByID);


router.get("/user/:userId", isAuthenticated, isSignedIn, getUser);

router.get('/users', getAllUsers);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get('/order/user/:userId', isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router
