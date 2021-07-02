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