const { ApplicationModel, ValidateApplication } = require("../Model/ApplicationModel");
var ObjectId = require("mongodb").ObjectId;

exports.getrecords = async (req, res, next) => {
    var draw = req.query.draw;
    var start = req.query.start;
    var length = req.query.length;
    var order_data = req.query.order;

    if (typeof order_data == "undefined") {
        var column_name = "customer_id";
        var column_sort_order = "desc";
    } else {
        var column_index = req.query.order[0]["column"];
        var column_name = req.query.columns[column_index]["data"];
        var column_sort_order = req.query.order[0]["dir"];
    }

    //search data
    var search_value = req.query.search["value"];

    res.status(200).send(totalCounts);
};

exports.create_one = async (req, res, next) => {
    const body_data = req.body;

    const check_data = await ApplicationModel.findOne({ package_name: body_data.package_name });
    if (check_data) return res.status(400).json("Already Exists Data!");

    const app_code = app_random(6);

    const check_app_code = await ApplicationModel.findOne({ app_code: body_data.app_code });
    if (check_app_code) return res.status(400).json("Already Exists app code!");

    const application = new ApplicationModel({
        name: body_data.name,
        app_version: body_data.app_version,
        account_id: body_data.account_id,
        package_name: body_data.package_name,
        firebase_id: body_data.firebase_id,
        sender_id: body_data.sender_id,
        account_url: body_data.account_url,
        app_code: app_code,
    });

    const res_application = await application.save();
    res.status(200).json(res_application);
};

exports.get_all = async (req, res, next) => {
    const get_all = await ApplicationModel.find().populate('account_id', {select: "name"});

    if (!get_all) return res.status(400).json("Sorry not data available!");
    res.status(200).json(get_all);
};

exports.get_one = async (req, res, next) => {
    const id = req.params.id;

    if (!id) return res.status(400).json("Not found id!");

    try {
        var o_id = new ObjectId(id);
    } catch (error) {
        return res.status(400).json(error.message);
    }

    const get_one = await ApplicationModel.findOne({ _id: o_id }).populate('account_id', {select: "name"});

    if (!get_one) return res.status(400).json("Sorry not data available!");
    res.status(200).json(get_one);
};

exports.update_one = async (req, res, next) => {
    const id = req.body.id;

    if (!id) return res.status(400).json("Not found id!");

    try {
        var o_id = new ObjectId(id);
    } catch (error) {
        return res.status(400).json(error.message);
    }

    const if_check_data = await AccountModel.findOne({_id: o_id});
    if (!if_check_data) return res.status(400).json("Sorry data not exists!");

    const get_data = await ApplicationModel.findOne({ _id: { $ne: o_id }, package_name: req.body.package_name });
    if (get_data) return res.status(400).json("Sorry data already exists!");

    let doc = await ApplicationModel.findByIdAndUpdate(o_id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!doc) {
        return res.status(404).json("No Record Found!");
    }
    res.status(200).json(doc);
};

exports.delete_one = async (req, res, next) => {
    const doc = await ApplicationModel.findByIdAndDelete(req.params.id);

    if (!doc) {
        return res.status(404).json("No Record Found!");
    }
    res.status(200).json(doc);
};

exports.ValidateBody = async (req, res, next) => {
    const { error } = ValidateApplication(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    next();
};

var app_random = function (length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}