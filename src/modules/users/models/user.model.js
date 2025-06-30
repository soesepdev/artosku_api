const db = require('../../../config/db');

const getUsers = async () => {
    try {
        return await db.any('SELECT * FROM users');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    getUsers
};