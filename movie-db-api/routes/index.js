const UserController = require('../controllers/UserController');
const NotFoundError = require('../errors/NotFoundError');
const authRoutes = require('./authRoutes');
const { authLocal, authJwt } = require('../services/auth/auth.services');

const userController = new UserController();

const registerRoutes = (app) => {

    // users
    app.post('/register', userController.register);
    app.post('/login', authLocal, userController.login);

    app.use(authJwt, authRoutes)

    // default 404
    app.use(function (req, res, next) {
        next(new NotFoundError());
    });

    // error handler
    app.use(function (err, req, res, next) {
        res.status(err.statusCode || 500);
        res.json(err);
    });
};

module.exports = {
    registerRoutes,
}