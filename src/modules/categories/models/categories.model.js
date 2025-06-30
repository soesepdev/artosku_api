const db = require('../../../config/db');

const getCategory = async (user_id) => {
  try {
    return await db.any(`
      SELECT 
        a.id, 
        a.user_id, 
        a.name,
        b.name AS icon
      FROM categories a
      LEFT JOIN icons b ON a.icon_id = b.id
      WHERE a.user_id = $1
      ORDER BY a.name ASC
    `, [user_id]);
  } catch (err) {
    console.error('getCategory error:', err);
    return [];
  }
};

const getCategoryById = async (id, user_id) => {
  try {
    return await db.oneOrNone(`
      SELECT 
        a.id, 
        a.user_id, 
        a.name,
        b.name AS icon
      FROM categories a
      LEFT JOIN icons b ON a.icon_id = b.id
      WHERE a.id = $1 AND a.user_id = $2
    `, [id, user_id]);
  } catch (err) {
    console.error('getCategoryById error:', err);
    return null;
  }
};

module.exports = {
  getCategory,
  getCategoryById
};