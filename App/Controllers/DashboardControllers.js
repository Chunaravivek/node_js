const { UsersModel, ValidateUser, ValidateLogin } = require('../Model/UsersModel');

const totalCounts = {
    UserCount : 0
};

exports.index = async (req, res, next) => {
    const userCount = UsersModel.countDocuments({status: true});

    const db_result = await Promise.all([userCount]);
    
    if(db_result) {
        totalCounts.UserCount = db_result[0];
    }

    res.status(200).send(totalCounts);
}