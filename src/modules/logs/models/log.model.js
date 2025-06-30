const db = require('../../../config/db');

const getLogs = async () => {
    try {
        return await db.any('SELECT * FROM logs');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    getLogs
};