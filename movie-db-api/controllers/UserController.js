const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { User } = require("../models/User");

class UserController {

    register = async(req, res, next) => {
        try {
            const user = new User(req.body);
            const u = await user.save();
            res.status(200).json(u);
        } catch(e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }

    login = async(req, res, next) => {
        const {user} = req;
        res.status(200).json({
            email: user.email,
            role: user.role,
            id: user._id,
            token: user.createToken(),
        });
    }

    getUsers = async(req, res, next) => {
        try {
        const { user } = req;
            if (user.isAdmin()) {
                await User.find().exec()
                .then((result) => res.status(200).json(result))
            }
        } catch (e) {
            next(e);
        }
    }
    
    getUsersFiltered = async(req, res, next) => {
        try {
        const { user } = req;
            if (user.isAdmin()) {
                const { query } = req.params;
                // WIP Search over multiple fields
                const result = await User.find( {$or: [({userName: {$regex: '.*' + query + '.*', $options: 'i'} }, {role: {$regex: '.*' + query + '.*', $options: 'i'}} )]} ).exec();
                res.status(200).json(result)
            }
        } catch (e) {
            next(e);
        }
    }

    getUsersPaginated = async(req, res, next) => {
        try {
            const { user } = req;
            if (user.isAdmin()) {
                const {page, perPage} = req.params;
                const pageAmount = await User.count().exec()
                    .then((totalUsers) => {
                        return Math.ceil(totalUsers / perPage)
                    });
                const users = await User.find().limit(parseInt(perPage)).skip(perPage * page).sort({
                    title: 'desc'
                }).exec();
                res.status(200).json({pageAmount, users});
            }
        } catch (e) {
            next(new NotFoundError());
        }
    }

}

module.exports = UserController;