const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    userinfo: {
        type: String,
        trim: true
    },

    // TODO: Come back here

    encry_password: {
        type: String
    },
    salt: String,

    role: {
        type: Number,
        default: 0,
    },
    purchases: {
        type: Array,
        default: []
    }

}, {timestamp: true})

// virtual field create on the fly or dynamically
userSchema.virtual("domain").get(function() {
    return this.email.slice(this.email().indexOf("@")+1);
});

// userSchema.virtual("fullname").
// get(function(){
//     return `${this.name} ${this.lastname}`;
// }).
// set(function(v){
//     const name = v.substring(0, v.indexOf(' '));
//     const lastname = v.substring(v.indexOf(' ') + 1);
//     this.set({name, lastname});
// })

// schema methods

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {

    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainPassword) {
        if (!plainPassword) return "";

        try {
            hash = crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');

        } catch(err) {
            return "";
        }
    }
}



module.exports = mongoose.model("User", userSchema);
