const { registerHandler } = require('../handler/registerHandler');
const { loginHandler } = require('../handler/loginHandler');
const { logoutHandler } = require('../handler/logoutHandler');
const { forgotHandler } = require('../handler/forgotHandler');
const { resetPassHandler } = require('../handler/resetHandler');
const { adminAccHandler } = require('../handler/adminAccHandler');
const { checkinHandler } = require('../handler/checkinHandler');

const auth = require('../handler/auth');

const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptions = {
    origin: ['*']
};

router.use(cors());

router.get('/', (req, res) => {
    res.status(200).send("Glints Worker's Attendance");
});

router.get('/login', (req, res) => {
    res.status(200).send({
        status: 'success',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9yZWdpc3RlciI6MiwiZW1haWwiOiJwYXJhbWl0YWFkaXR1bmdAZ21haWwuY29tIiwiaWF0IjoxNjMyNDAxOTkzLCJleHAiOjE2MzI0MDU1OTN9.0CSMu2GElkyIILuuThRNQGFgGsL4vLL10OJFiBpmcaY',
        message: 'Login Success'
    }).header("Access-Control-Allow-Origin", "*");
});

router.get('/register', (req, res) => {
    res.status(201).json({
        status: 'success',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmFtaXRhYWRpdHVuZ0BnbWFpbC5jb20iLCJpYXQiOjE2MzIxNDc2MTgsImV4cCI6MTYzMjE1MTIxOH0.ZB2cVWxHP3TJvE5xn_9nZ-WEzT_HTmJUX4W0PZu81os',
        message: 'Register Account Successful',
        data: {
            id_register: 1,
            full_name: "Natasya Susanto",
            email: "natasya.susanto01@gmail.com",
            password: "$2b$10$Eq2hk7cvajiyQNOQuCP1vezcP.0fdvVfI67M44eHhUmyEB7Tv5QCy"
        }
    });
});

router.post('/register', registerHandler);
router.post('/login', loginHandler);

router.post('/home', auth, (req, res) => {
    res.status(200).send("Welcome to Home Page");
});

router.post('/checkin', auth, checkinHandler);

router.post('/forgot', forgotHandler);
router.get('/reset/:id_register', resetPassHandler);
router.post('/reset/:id_register', resetPassHandler);

router.put('/admin/:id_register', auth, adminAccHandler);

router.put('/logout', logoutHandler);



module.exports = router;