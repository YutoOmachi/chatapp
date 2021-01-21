const express = require("express");
const path = require('path');
const router = express.Router()

router
    .route("/")
    .get( (req,res) => {
        let reqPath = path.join(__dirname, "../../client/views/register.html");
        res.sendFile(reqPath);
    })
    .post( (req,res) => {
        res.send("Registered");
    })

module.exports = router;