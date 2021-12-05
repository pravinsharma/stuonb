const Session = require('../models/schema/session.schema');
var { errmsg } = require('../utils/constants');

const sessionService = {
    create: (userid, token) => {
        if(!(userid, token)) {
            return new Error(errmsg.e100);
        }

        // Create a Session
        const session = new Session({
            userid, token
        });

        // Save Session in the database
        return session.save();
    },
    findAll: () => {
        // Retrieve and return all sessions from the database.
        return Session.find()
            .then(data => data)
            .catch(err => err);
    },
    findLatestByUserid: (userid) => {
        // Retrieve and return all sessions from the database.
        return Session.find({ 'userid': userid }).limit(1).sort('-createdAt')
            .then(data => data)
            .catch(err => err);
    },
    findOne: (id) => {
        // Validate Request
        if(!id) {
            return new Error(errmsg.e100);
        }

        // Retrieve and return all sessions from the database.
        return Session.findById(id)
            .then(data => data)
            .catch(err => err);
    },
    update: (id, userid, token) => {
        // Validate Request
        if(!id) {
            return new Error(errmsg.e100);
        }

        // Find session and update it with the request body
        return Session.findByIdAndUpdate(id, {
            userid, token
        }, {new: true})
        .then(session => session)
        .catch(err => err);
    },
    delete: (id) => {
        // Validate Request
        if(!id) {
            return new Error(errmsg.e100);
        }

        return Session.findByIdAndRemove(id)
        .then(session => session)
        .catch(err => err);
    }
};

module.exports = sessionService;