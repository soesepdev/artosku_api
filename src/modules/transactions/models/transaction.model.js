const db = require('../../../config/db');

const getTransactions = async (user_id) => {
    try {
        return await db.any(`
            SELECT a.*, b.name as category FROM transactions a
            JOIN categories b ON a.category_id = b.id
        `);
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    getTransactions
};