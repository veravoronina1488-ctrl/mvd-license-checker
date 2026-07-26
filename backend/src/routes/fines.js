const express = require('express');
const pool = require('../config/database');
const {authenticate, authorize} = require('../middleware/auth');
const router = express.Router();
router.post('/', authenticate, authorize(['admin']), async (req, res) => {try {const result = await pool.query('INSERT INTO fines (driver_id, fine_number, violation_date, violation_description, fine_amount, issued_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [req.body.driver_id, req.body.fine_number, req.body.violation_date, req.body.violation_description, req.body.fine_amount, req.body.issued_date]);res.status(201).json(result.rows[0])} catch (err) {res.status(500).json({error: 'Failed to create fine'})}});
module.exports = router;