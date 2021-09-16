const { addUserHandler, loginHandler } = require('../handler/userHandler');

const auth = require('../handler/auth');

const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());

router.post('/register', addUserHandler);
router.post('/login', loginHandler);

router.get('/welcome', auth, (req, res) => {
    res.status(200).send("Welcome to Home Page");
});

module.exports = router;