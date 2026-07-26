const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const {authenticate} = require('../middleware/auth');
const router = express.Router();
router.post('/login', async (req, res) => {try {const {email, password} = req.body;if (!email || !password) return res.status(400).json({error: 'Email and password required'});const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);const user = result.rows[0];if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({error: 'Invalid credentials'});const token = jwt.sign({id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});res.json({message: 'Login successful',token,user: {id: user.id, email: user.email, full_name: user.full_name, role: user.role}})} catch (err) {res.status(500).json({error: 'Login failed'})}});
module.exports = router;