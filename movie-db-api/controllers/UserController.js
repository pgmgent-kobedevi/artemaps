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

}

module.exports = UserController;