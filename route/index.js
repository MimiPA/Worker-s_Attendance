const { addUserHandler, loginHandler } = require('../handler/userHandler');

const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());

router.post('/register', addUserHandler);
router.post('/login', loginHandler);

module.exports = router;