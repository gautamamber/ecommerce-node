const express = require("express");

const router = express.Router()

const {getCategoryById, deleteCategory, updateCategory, createCategory, getCategory, getAllCategory} = require("../controllers/category");
const {getUserByID} = require("../controllers/user");
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth");

router.param("userId", getUserByID);
router.param("categoryId", getCategoryById);

// actual router
router.post("/category/create/:userId", 
isSignedIn, 
isAuthenticated, 
isAdmin, 
createCategory)

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);    

// update route

router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

// delete operation

router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteCategory);

module.exports = router;
