const db = require('../../../config/db');

const getTasks = async (id = '') => {
    try {
        return await db.any(`SELECT 
            t.id, 
            t.title, 
            t.description, 
            u.full_name AS user_name, 
            p.project_name, 
            s.status_name, 
            i.icon,
            t.created_at,
            t.updated_at,
            t.is_active,
            t.is_deleted
            FROM tasks t 
            LEFT JOIN users u ON t.user_id=u.id 
            LEFT JOIN projects p ON t.project_id=p.id 
            LEFT JOIN status s ON t.status_id=s.id 
            LEFT JOIN icons i ON s.icon_id=i.id
        `);
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    getTasks
};