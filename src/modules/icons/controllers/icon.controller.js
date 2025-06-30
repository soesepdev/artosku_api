const express = require('express');
const router = express.Router();
const model = require('../models/icon.model');

router.get('/', async (req, res) => {
  const result = await model.getIcons();
  if (!result || result.length === 0) {
    return res.status(404).json({ message: 'Data not found!' });
  }
  res.json(result);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await model.getIconById(id);
  if (!result) {
    return res.status(404).json({ message: 'Icon not found!' });
  }
  res.json(result);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const result = await model.createIcon(data);
  if (!result) {
    return res.status(500).json({ message: 'Failed to create icon' });
  }
  res.status(201).json(result);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await model.updateIcon(id, data);
  if (!result) {
    return res.status(404).json({ message: 'Icon not found or failed to update' });
  }
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await model.deleteIcon(id);
  if (!result || result.rowCount === 0) {
    return res.status(404).json({ message: 'Icon not found or failed to delete' });
  }
  res.json({ message: 'Icon deleted successfully' });
});

module.exports = router;