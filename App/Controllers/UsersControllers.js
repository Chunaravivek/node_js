const { UsersModel, ValidateUser, ValidateLogin } = require('../Model/UsersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
    const body_data = req.body;

    const check_data = await UsersModel.findOne({ email: body_data.email });

    if (check_data) return res.status(400).json('Already Exists Data!');

    let user = new UsersModel({
        username: body_data.username,
        first_name: body_data.first_name,
        last_name: body_data.last_name,
        gender: body_data.gender,
        email: body_data.email,
        password: body_data.password,
        name: body_data.name,
        mobile: body_data.mobile,
        avatar: req.file.filename,
        status: 1,
    });

    user = await user.save();
    res.status(200).json(user);
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    const check_data = await UsersModel.findOne({ email: email });

    const validPassword = await bcrypt.compare(password, check_data.password);
    if (!validPassword) return res.status(400).json('Invalid email or password.');

    const token = check_data.generateAuthToken();
    res.status(200).send(token);
}

exports.ValidateBody = async (req,res,next) => {  
    const {error} = ValidateUser(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    next();
}

exports.ValidateLogin = async (req,res,next) => {
    const {error} = ValidateLogin(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    next();
}