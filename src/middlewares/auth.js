const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak ditemukan'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token telah kedaluwarsa'
        });
      }

      return res.status(403).json({
        success: false,
        message: 'Token tidak valid'
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;