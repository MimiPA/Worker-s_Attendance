const {
    addUserHandler,
    loginHandler
} = require('../handler/userHandler');

const { logoutHandler } = require('../handler/logoutHandler');

const { forgotHandler } = require('../handler/forgotHandler');

const {resetPassHandler} = require('../handler/resetHandler');

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

router.post('/forgot', forgotHandler);
router.get('/reset/:id_register', resetPassHandler);
router.post('/reset/:id_register', resetPassHandler);

router.put('/logout', logoutHandler);



module.exports = router;