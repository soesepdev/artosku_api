const express = require('express');
const router = express.Router();
const model = require('../models/category.model');
const authenticateToken = require('../../../middlewares/auth');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await model.getCategory(user_id);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Data not found!' });
    }

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.id;
    const result = await model.getCategoryById(id, user_id);

    if (!result) {
      return res.status(404).json({ message: 'Category not found!' });
    }

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;