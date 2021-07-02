const express = require("express");

const router = express.Router()

const {getProductById, 
    getAllCategories, 
    getAllProducts, 
    updateProduct, 
    deleteProduct, 
    photo, 
    createProduct} = require("../controllers/product");
const {isAdmin, isSignedIn, isAuthenticated} = require("../controllers/auth");
const {getUserByID} = require("../controllers/user");


router.param("userId", getUserByID);
router.param("productId", getProductById);


// post

router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

// get product
router.get("/product/:productId",  getProductById);
// photo get route
router.get("/product/photo/:productId", photo);


// update

router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);


// delete

router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

// listing routes

router.get("/products", getAllProducts);

// get all categories

router.get("/products/categories", getAllCategories);

module.exports = router;
