const User = require("../models/user");
const Order = require("../models/order");

exports.getUserByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User does not exists"
            });
        }

        req.profile = user
        next();
    })
}

exports.getUser = (req, res) => {
    // TODO: Get back here for password
    req.profile.salt = undefined;
    req.profile.password = undefined;
    return res.json(req.profile)
}


exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err || !users) {
            return res.status(400).json({
                error: "No users"
            })
        }

        res.json(users);
    })
}

exports.updateUser = (req, res) => {
    // we have to firing the update query
    User.findByIdAndUpdate(
        {
            _id: req.profile._id
        },
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error: "Update failed"
                })
            }

            res.json(user)
        
        }
    )
}


exports.userPurchaseList = (req, res) => {
    Order.find({user: user.profile._id})
    .populate("user", "_id name email")
    .exec((err, order) => {
        if (err) {
            return res.status(400).json(
                {
                    error: "No order for this user"
                }
            )
        }
        return res.json(order);
    })

}


exports.pushOrderInPurchaseList = (req, res, next) => {
    // use push

    let purchases = []
    req.body.order.products.forEach(element => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order_transaction_id
        })
    });

    // store in db

    User.findByIdAndUpdate(
        {_id: req.profile.id},
        {$push: {purchases: purchases}},
        // send updated data
        {new: true},
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchased list"
                })
            }
        }
        

    )

    next()
}