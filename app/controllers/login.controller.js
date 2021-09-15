const Session = require('../models/schema/session.schema');

// Register user
exports.register = (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Required params missing..."
        });
    }

    // Create a Session
    const session = new Session({
        userid: req.body.userid,
        token: req.body.token
    });

    // Save Session in the database
    session.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Session."
        });
    });
};

// Create/Save a new Session
exports.login = (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Required params missing..."
        });
    }

    // Create a Session
    const session = new Session({
        userid: req.body.userid,
        token: req.body.token
    });

    // Save Session in the database
    session.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Session."
        });
    });
};