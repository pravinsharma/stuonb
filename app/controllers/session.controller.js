const sessionService = require('../services/session.service');

// Create/Save a new Session
exports.create = (req, res) => {
    sessionService
    .create(
        req.body.userid,
        req.body.token)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the session."
        });
    });
};

// Retrieve and return all sessions from the database.
exports.findAll = (req, res) => {
    sessionService
    .findAll()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving sessions."
        });
    });
};

// Find a single session with a id
exports.findOne = (req, res) => {
    sessionService
    .findById(req.params.id)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving session."
        });
    });
};

// Update a session identified by the id in the request
exports.update = (req, res) => {
    sessionService
    .create(
        req.params.id,
        req.body.userid,
        req.body.token)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the session."
        });
    });
};

// Delete a session with the specified id in the request
exports.delete = (req, res) => {
    sessionService
    .delete(req.params.id)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting session."
        });
    });
};