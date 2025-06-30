const express = require('express');
const router = express.Router();
const model  = require('../models/task.model');

router.get('/', async (req, res) => {
    let result = await model.getTasks();
    if (result.length == 0) {
      return res.json({ message: 'Data not found!' });
    }
    res.send(result);
});

router.get('/:id', async (req, res) => {
    let result = await model.getTasks(req.params.id);
    if (result.length == 0) {
      return res.json({ message: 'Data not found!' });
    }
    res.send(result);
});

module.exports = router;