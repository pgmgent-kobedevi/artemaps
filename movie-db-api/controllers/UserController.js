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
            userName: user.userName,
            id: user._id,
            token: user.createToken(),
        });
    }

    getSelf = async(req, res, next) => {
        try {
            const { user } = req;
            await User.find().exec()
            .then((result) => res.status(200).json(result))
        } catch (e) {
            next(e);
        }
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
                const result = await User.find(
                    {
                        $or: [
                        {email: {$regex: '.*' + query + '.*', $options: 'i'}},
                        {userName: {$regex: '.*' + query + '.*', $options: 'i'}}, 
                        {role: {$regex: '.*' + query + '.*', $options: 'i'}},
                    ] }).exec();
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

    updateUser = async(req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User.findById({_id: id}).exec();
            if(user) {
                user.overwrite(req.body);
                const result = await user.save();
                res.status(200).json(result);
            } else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e);
        }
    }

    updateSelf = async(req, res, next) => {
        try {
            const {user} = req;
            const u = await User.findById({_id: user.id}).exec();
            if(u) {
                u.overwrite({
                    ...u,
                    ...req.body,
                    password: u.password,
                    role: u.role,
                });
                const result = await u.save();
                res.status(200).json({email: result.email, userName: result.userName});
            } else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e);
        }
    }

    deleteUser = async(req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User.findById({_id: id}).exec();
            if(user) {
                user.remove();
                res.status(200).json(user);
            } else {
                next(new NotFoundError());
            }
        } catch (e) {
            next(e);
        }
    }

}

module.exports = UserController;