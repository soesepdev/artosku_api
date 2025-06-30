const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const model  = require('../models/auth.model');

router.post('/register', async (req, res) => {
    const { full_name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const existing = await model.checkEmail(email);
    if (existing) {
        return res.status(404).json({ 
            success: false,
            message: 'Email sudah terdaftar',
            errors: null
        });
     }

    const user = await model.register({
        full_name,
        email,
        password: hashed,
    });

    res.status(201).json({
        success: true,
        message: 'Daftar Berhasil',
    });
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().empty('').messages({
        'string.email': 'Format email tidak valid',
        'any.required': 'Email wajib diisi'
    }),
    password: Joi.string().min(6).required().empty('').messages({
        'string.min': 'Password minimal 6 karakter',
        'any.required': 'Password wajib diisi'
    })
});

router.post('/login', async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await model.checkEmail(email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '10m' }
        // { expiresIn: '1d' }
    );

    const decoded = jwt.decode(token);
    const token_expired_at = new Date(decoded.exp * 1000);

    const updatedUser = await model.updateLogin({
        id: user.id,
        token,
        token_expired_at
    });

    res.json({
        id: updatedUser.id,
        full_name: updatedUser.full_name,
        email: updatedUser.email,
        token: updatedUser.token,
        token_expired_at: updatedUser.token_expired_at,
        last_login: updatedUser.last_login
    });
});

module.exports = router;