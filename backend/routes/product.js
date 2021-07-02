const express = require("express");

const router = express.Router()

const {getProductById, createProduct} = require("../controllers/product");
const {isAdmin, isSignedIn, isAuthenticated} = require("../controllers/auth");
const {getUserByID} = require("../controllers/user");


router.param("userId", getUserByID);
router.param("productId", getProductById);


// post

router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)



module.exports = router;
