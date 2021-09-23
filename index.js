const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: ['*']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
const router = require('./route');

app.use('/', router);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});