const {
    addUserHandler,
    loginHandler
} = require('../handler/userHandler');

const { logoutHandler } = require('../handler/logoutHandler');

const auth = require('../handler/auth');

const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());

router.post('/register', addUserHandler);
router.post('/login', loginHandler);

router.post('/welcome', auth, (req, res) => {
    res.status(200).send("Welcome to Home Page");
});

router.put('/logout', auth, logoutHandler);


module.exports = router;