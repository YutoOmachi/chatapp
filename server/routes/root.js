const express = require("express");
const path = require('path');
const router = express.Router()

router
    .route("/")
    .get((req,res) => {
        res.redirect("/login");
    })
    .post((req, res) => {
        let reqPath = path.join(__dirname, "../../client/views/chat.ejs");
        let username = req.body.username;
        if(username == "") res.redirect("/login");
        else res.render(reqPath, {username: username});
    })

module.exports = router;