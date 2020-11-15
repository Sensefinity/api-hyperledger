const UserService = require('../services/user.service');
const AccessTokenService = require('../services/accessToken.service');

exports.verifyToken = async function (req, res, next) {
    try {
        if (!req.headers['authorization']) {
            res.sendStatus(401);
            return;
        }
        let [scheme, token] = req.headers['authorization'].toString().split(' ');
        scheme = scheme.toLowerCase();
        if (!scheme || !token) {
            res.sendStatus(401);
            return;
        }
        if (scheme != 'basic' && scheme != 'bearer') {
            res.sendStatus(401);
            return;
        }
        let user = null;
        switch (scheme) {
            case 'basic':
                let [email, password] = Buffer(token, 'base64').toString().split(':', 2);
                user = await UserService.findByEmail(email);
                if (user && !await UserService.verifyPassword(user, password)) {
                    res.sendStatus(401);
                    return;
                }
                break;
            case 'bearer':
                let accessToken = await AccessTokenService.findById(token);
                if (!accessToken || !accessToken.isActive) {
                    res.sendStatus(401);
                    return;
                }
                user = await UserService.findById(accessToken.userId);
                break;
            default:
                res.sendStatus(401);
                break;
        }
        if (!user) {
            res.sendStatus(401);
            return;
        }
        req['user'] = user;
    } catch (e) {
        res.sendStatus(401);
        return;
    }
    next();
}