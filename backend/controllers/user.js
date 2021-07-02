const User = require("../models/user");


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

