require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const PORT    = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL;
const modulesPath = path.join(__dirname, 'modules');

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

fs.readdirSync(modulesPath).forEach((moduleName) => {
  const controllerPath = path.join(modulesPath, moduleName, 'controllers');
  if (fs.existsSync(controllerPath)) {
    fs.readdirSync(controllerPath).forEach((file) => {
      if (!file.endsWith('.js')) return;
      const fullPath = path.join(controllerPath, file);
      const controller = require(fullPath);
      const baseRoute = `/${moduleName}`;
      app.use(baseRoute, controller);
    });
  }
});

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} does not exist`,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${baseUrl}:${PORT}`);
});

module.exports = app;