const studentService = require('../services/student.service');
const sessionService = require('../services/session.service');
const utilToken = require('../utils/jwt');

// Register user
exports.register = (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Required params missing..."
        });
    }
};

// Create/Save a new Session
exports.login = (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Required params missing..."
        });
    }

    // Save Session in the database
    studentService.findByEmail(req.body.username)
        .then(data => {
            if (!data) {
                throw new Error('User not found...');
            }

            if (data.passwd !== req.body.password) {
                throw new Error('Password mismatch...');
            }

            /* get latest valid token */
            sessionService.findLatestByUserid(data._id)
                .then(res2 => {
                    if (res2.length) {
                        const decodedToken = utilToken.decodeToken(res2[0].token);
                        if (!decodedToken) {
                            res2.length = 0;
                        }
                    }

                    if (!res2.length) {
                        const jwt = utilToken.getToken(data._id, data.email);

                        sessionService.create(data._id, jwt)
                            .then(res2 => {
                                res.send({
                                    token: res2.token,
                                    expiresIn: res2.expiresIn
                                });
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occurred while creating the Session."
                                });
                            });
                    } else {
                        res.send({
                            token: res2[0].token,
                            expiresIn: res2[0].expiresIn
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Session."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while fetching user details."
            });
        });
};