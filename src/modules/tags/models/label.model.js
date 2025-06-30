const db = require('../../../config/db');

const getLabels = async () => {
  try {
    return await db.any('SELECT * FROM labels');
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getLabelById = async (id) => {
  try {
    return await db.oneOrNone('SELECT * FROM labels WHERE id = $1', [id]);
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createLabel = async (data) => {
  try {
    const { name, color } = data; // sesuaikan field dengan struktur tabel
    return await db.one(
      'INSERT INTO labels(name, color) VALUES ($1, $2) RETURNING *',
      [name, color]
    );
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateLabel = async (id, data) => {
  try {
    const { name, color } = data;
    return await db.oneOrNone(
      'UPDATE labels SET name = $1, color = $2 WHERE id = $3 RETURNING *',
      [name, color, id]
    );
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteLabel = async (id) => {
  try {
    return await db.result('DELETE FROM labels WHERE id = $1', [id]);
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getLabels,
  getLabelById,
  createLabel,
  updateLabel,
  deleteLabel
};