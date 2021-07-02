const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");

// acccess the path, include file system
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product
        next();
    })
}

exports.createProduct = (req, res) => {
    // create product with form data (formidable)

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            res.status(400).json({
                error: "Not able to create product"
            });
        }
    });

    const {name, description, price, category, stock} = fields;
    if (
        !name ||
        !description ||
        !price ||
        !category ||
        !stock
    ) {
        return res.status(400).json({
            error: "Please include all fields"
        })
    }

    // TODO: restriction on fields
    let product = new Product(fields);
    // store images on s3 buckets
    // handle file here
    if (file.photo) {
        if (file.photo.size > 300000) {
            return res.status(400).json({
                error: "file size if too big"
            });
        }
        // include file in product

        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;

    }
    // save to the db
    product.save((err, product) => {
        if (err) {
            res.status(400).json({
                error: "saving in db is failed"
            });
        }
        res.json(product);
    })

}

exports.getProduct = (req, res) => {
    res.product.photo = undefined
    return res.json(req.product);
    // put middleware, add loaded photo url
}


exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)

    }
    next();
}

exports.deleteProduct = (req, res) => {
    // delete products
    let product = req.product;
    product.remove((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete"
            });
        }
        res.json(product);
    })
}

exports.updateProduct = (req, res) => {

}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ?  parseInt(req.query.limit) : 8 
    Product.find()
    .sort()
    .select("-photo")
    .limit(limit)
    .exec((err, products) => {
        if (err) {
            return res.status(400).json({
                error: "No product find"
            });
        }
        res.json(products);
    })
}


exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation fail"
            })
        }
        next();
    })
}


exports.getAllCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) {
        if (err) {
            return res.status(400).json({
                error: "Not found"
            });
        }
        res.json(category);
    })
}
