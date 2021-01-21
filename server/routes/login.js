const express = require("express");
const path = require('path');
const router = express.Router()

router
    .route("/")
    .get( (req,res) => {
        let reqPath = path.join(__dirname, '../../client/views/login.html');
        res.sendFile(reqPath);
    })

module.exports = router;