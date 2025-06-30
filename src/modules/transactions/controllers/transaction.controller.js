const express = require('express');
const router = express.Router();
const model  = require('../models/transaction.model');
const authenticateToken = require('../../../middlewares/auth');

router.get('/', authenticateToken, async (req, res) => {
  const user_id = req.user.id;
  let result = await model.getTransactions(user_id);

  if (result.length == 0) {
    return res.json({ message: 'Data not found!' });
  }
  res.json(result);
});

module.exports = router;