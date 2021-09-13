const { addUserHandler } = require('../handler/userHandler');

const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());

router.post('/register', addUserHandler);

module.exports = router;