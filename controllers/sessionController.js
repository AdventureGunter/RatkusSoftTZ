/**
 * Created by User on 10.07.2017.
 */
module.exports.checkSessionForAut = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('USER already at session');
        return next({
            message: 'USER already at session',
            status: 403
        })
    }
    else next();
};

module.exports.checkSessionForGet = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log('User not authenticated');
        return next({
            message: 'User not authenticated',
            status: 401
        })
    }
    else next();
};