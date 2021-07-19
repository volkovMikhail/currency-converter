const request = require("request");

module.exports = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body));
            } else {
                reject({ success: false });
            }
        });
    });
};
