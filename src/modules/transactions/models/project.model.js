const db = require('../../../config/db');

const getProjects = async () => {
    try {
        return await db.any('SELECT id, project_name, is_active, is_deleted FROM projects');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    getProjects
};