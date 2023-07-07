const { AccountModel, ValidateAccount } = require("../Model/AccountModel");
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

    const check_data = await AccountModel.findOne({ name: body_data.name });

    if (check_data) return res.status(400).json("Already Exists Data!");

    let account = new AccountModel({
        name: body_data.name,
        platform: body_data.platform,
        url: body_data.url,
        email: body_data.email,
        status: 1,
    });

    account = await account.save();
    res.status(200).json(account);
};

exports.get_all = async (req, res, next) => {
    const get_all = await AccountModel.find();

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

    const get_one = await AccountModel.findOne({ _id: o_id });

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

    const get_data = await AccountModel.findOne({_id: { $ne: o_id }, name: req.body.name });
    if (get_data) return res.status(400).json("Sorry data already exists!");

    let doc = await AccountModel.findByIdAndUpdate(o_id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!doc) {
        return res.status(404).json("No Record Found!");
    }
    res.status(200).json(doc);
};

exports.delete_one = async (req, res, next) => {
    const doc = await AccountModel.findByIdAndDelete(req.params.id);

    if (!doc) {
        return res.status(404).json("No Record Found!");
    }
    res.status(200).json(doc);
};

exports.ValidateBody = async (req, res, next) => {
    const { error } = ValidateAccount(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    next();
};
