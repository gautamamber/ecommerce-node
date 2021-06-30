const User = require("../models/user");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt")


exports.signup = (req, res) => {
   // save user

   const errors = validationResult(req);
   console.log(errors);
   if (!errors.isEmpty()) {
       return res.status(422).json({
           error: errors.array()[0]
       })
   }

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


exports.signin = (req, res) => {
    // extract email and password
    // destructring
    const errors = validationResult(req);
    const {email, password} = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0]
        })
    }

    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User does not exists"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        // signin, create token, put token in cookie
        const token = jwt.sign({
            _id: user._id
        },
        "AMBERGAUTAM")
        // put token in user cookie
        res.cookie("token", token, {expire: new Date() + 9999});

        // send response to frontend

        // destructuring
        const {_id, name, email, role} = user;
        
        return res.json({
            token, user: {_id, name, email, role}
        });

    })

}


exports.signout = (req, res) => {
    // clear the cookie of name token
    res.clearCookie('token')
    res.json({
        message: "User Signout Successfully!"
    });
}

// protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

// custom middlewares
