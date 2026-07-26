const express = require('express');
const pool = require('../config/database');
const {authenticate, authorize} = require('../middleware/auth');
const router = express.Router();
router.get('/stats', authenticate, authorize(['admin']), async (req, res) => {try {const drivers = (await pool.query('SELECT COUNT(*) FROM drivers')).rows[0].count;const fines = (await pool.query('SELECT COUNT(*) FROM fines')).rows[0].count;const unpaid = (await pool.query('SELECT COUNT(*) FROM fines WHERE status = \'unpaid\'')).rows[0].count;res.json({total_drivers: parseInt(drivers), total_fines: parseInt(fines), unpaid_fines: parseInt(unpaid)})} catch (err) {res.status(500).json({error: 'Failed to get stats'})}});
module.exports = router;