
const resp = {
    "send": (res, status, json ) => {
        var statusCode = status;

        var payload = json ? JSON.stringify( json ): null;

        res.writeHead(statusCode);
        res.end( payload );
    }
};

module.exports = resp;