const express = require("express");
const path = require('path');
const router = express.Router()

router
    .route("/")
    .get((req,res) => {
        res.redirect("/login");
    })

module.exports = router;