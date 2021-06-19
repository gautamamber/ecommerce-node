const User = require("../models/user");


exports.signup = (req, res) => {
   // save user

   const user = new User(req.body)
   // use callback
   user.save((err, user) => {
    if (err) { 
        console.log(err);
        return res.status(400).json({
            err: "Not able to save user in db"
        });
    }
    res.json({
        name: user.name,
        id: user._id,
        email: user.email
    });
   })

};


exports.signout = (req, res) => {
    res.json({
        message: "User Signout!"
    })
}
