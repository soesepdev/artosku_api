const db = require('../../../config/db');

const register = async (data) => {
    const { full_name, email, password } = data;

    return db.oneOrNone(
        `INSERT INTO users (full_name, email, password, created_at, updated_at)
        VALUES ($1, $2, $3, NOW(), NOW())
        RETURNING id, full_name, email`,
        [full_name, email, password]
    );
}

const checkEmail = async (email) => {
    return db.oneOrNone(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
}

const updateLogin = async (data) => {
    const { id, token, token_expired_at } = data;
    return db.oneOrNone(
        `UPDATE users 
        SET token = $1, token_expired_at = $2, last_login = NOW(), updated_at = NOW() 
        WHERE id = $3 RETURNING *`,
        [token, token_expired_at, id]
    );
}

module.exports = {
    register,
    checkEmail,
    updateLogin
};