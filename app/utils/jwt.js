var jwt = require('jsonwebtoken');
var log = require('./app/utils/log');
var { token } = require('./app/utils/constants');

// Create token
modules.exports = {
    getToken: (id, email) => jwt.sign(
        { user_id: id, email },
        token.key,
        { expiresIn: token.expiresIn }
    )
}