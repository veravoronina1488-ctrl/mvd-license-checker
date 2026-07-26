const express = require('express');
const pool = require('../config/database');
const {authenticate, authorize} = require('../middleware/auth');
const router = express.Router();
router.post('/', authenticate, authorize(['admin']), async (req, res) => {try {const result = await pool.query('INSERT INTO violations (driver_id, violation_type, violation_date, description) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.driver_id, req.body.violation_type, req.body.violation_date, req.body.description]);res.status(201).json(result.rows[0])} catch (err) {res.status(500).json({error: 'Failed to create violation'})}});
module.exports = router;