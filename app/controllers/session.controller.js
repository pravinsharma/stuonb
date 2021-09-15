const Session = require('../models/session.schema');

// Create/Save a new Session
exports.create = (req, res) => {
    if(!req.body.userid || !req.body.token) {
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

// Retrieve and return all sessions from the database.
exports.findAll = (req, res) => {
    Session.find()
    .then(sessions => {
        res.send(sessions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving sessions."
        });
    });
};

// Find a single session with a id
exports.findOne = (req, res) => {
    Session.findById(req.params.id)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.id
            });            
        }
        res.send(session);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving session with id " + req.params.id
        });
    });
};

/*
// Update a session identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.params.id) {
        return res.status(400).send({
            message: "No selection given..."
        });
    }

    // Find session and update it with the request body
    Session.findByIdAndUpdate(req.params.id, {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        passwd: req.body.passwd,
        roll: req.body.roll,
        age: req.body.age,
        address: req.body.address,
        courseid: req.body.courseid
    }, {new: true})
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.id
            });
        }
        res.send(session);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating session with id " + req.params.id
        });
    });
};

// Delete a session with the specified id in the request
exports.delete = (req, res) => {
    Session.findByIdAndRemove(req.params.id)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.id
            });
        }
        res.send({message: "Session deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete session with id " + req.params.id
        });
    });
};
*/