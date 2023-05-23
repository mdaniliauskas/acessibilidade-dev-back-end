const express = require('express');

const router = express.Router();

const openai = require('../services/generate.js')

router.use(express.json());

router.post('/openai', openai.generate);

module.exports = router;