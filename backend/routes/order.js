const express = require("express");

const router = express.Router()

const {getCategoryById, deleteCategory, updateCategory, createCategory, getCategory, getAllCategory} = require("../controllers/category");
const {getUserByID, pushOrderInPurchaseList} = require("../controllers/user");
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth");
const {updateStock} = require("../controllers/product");

const {getOrderByID, getAllOrders, createOrder} = require("../controllers/order");


router.param("userId", getUserByID);
router.param("orderId", getOrderByID);

router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);
router.get("/order", isSignedIn, isAuthenticated, getAllOrders);
module.exports = router;
