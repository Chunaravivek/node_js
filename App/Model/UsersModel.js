const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        first_name: {
            type: String,
            trim: true,
            minlength: 1,
            maxlength: 255,
        },
        last_name: {
            type: String,
            trim: true,
            minlength: 1,
            maxlength: 255,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            default: "Male",
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        password: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        name: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        avatar: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255
        },
        mobile: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        status: {
            type: Boolean,
            default: true,
            index: true
        }
    },
    { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        avatar: this.avatar,
        gender: this.gender,
        email: this.email,
        name: this.name,
        mobile: this.mobile,
    }, process.env.JWT_KEY, { expiresIn: "1h" });

    return token;
}

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model('User', userSchema);

function ValidateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(255).required(),
        first_name: Joi.string().min(3).max(255).required(),
        last_name: Joi.string().min(3).max(255).required(),
        gender: Joi.any().valid('Male','Female'),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().min(3).max(255).required(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    });

    return schema.validate(user);
}

function ValidateLogin(loginPayload) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    return schema.validate(loginPayload);
}

module.exports.ValidateLogin = ValidateLogin;
module.exports.ValidateUser = ValidateUser;
module.exports.UsersModel = User;
