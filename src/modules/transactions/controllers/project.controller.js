const express = require('express');
const router = express.Router();
const model  = require('../models/project.model');

router.get('/', async (req, res) => {
    let result = await model.getProjects();
    if (result.length == 0) {
      return res.json({ message: 'Data not found!' });
    }
    res.json(result);
});

module.exports = router;