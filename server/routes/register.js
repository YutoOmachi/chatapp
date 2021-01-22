const express = require("express");
const path = require('path');
const bcrypt = require("bcrypt")
const router = express.Router()


router
    .route("/")
    .get( (req,res) => {
        let reqPath = path.join(__dirname, "../../client/views/register.html");
        res.sendFile(reqPath);
    })
    .post( async (req,res) => {
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            console.log({username: req.body.username, email: req.body.email, password: hashedPassword});
        } catch(err) {
            res.redirect("/register");
        }
    })

module.exports = router;