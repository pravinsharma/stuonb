var jwt = require('jsonwebtoken');
var log = require('./log');
var { token } = require('./constants');

// Create token
module.exports = {
    getToken: (id, email) => jwt.sign(
        { user_id: id, email },
        token.key,
        { expiresIn: token.expiresIn }
    ),
    decodeToken: (jwttoken) => {
        try {
            return jwt.verify(jwttoken, token.key);
        } catch (_) {
            return null;
        }
    }
}