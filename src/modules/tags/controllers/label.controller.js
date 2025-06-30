const express = require('express');
const router = express.Router();
const model = require('../models/label.model');

router.get('/', async (req, res) => {
  const result = await model.getLabels();
  if (!result || result.length === 0) {
    return res.status(404).json({ message: 'Data not found!' });
  }
  res.json(result);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await model.getLabelById(id);
  if (!result) {
    return res.status(404).json({ message: 'Label not found!' });
  }
  res.json(result);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const result = await model.createLabel(data);
  if (!result) {
    return res.status(500).json({ message: 'Failed to create label' });
  }
  res.status(201).json(result);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await model.updateLabel(id, data);
  if (!result) {
    return res.status(404).json({ message: 'Label not found or update failed' });
  }
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await model.deleteLabel(id);
  if (!result || result.rowCount === 0) {
    return res.status(404).json({ message: 'Label not found or delete failed' });
  }
  res.json({ message: 'Label deleted successfully' });
});

module.exports = router;