const express = require("express");
const path = require('path');
const bcrypt = require("bcrypt");
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
            let username = req.body.username;
            let email = req.body.email;
            require("../database/dbInsert").insertUser(username, email, hashedPassword);
            req.flash("error", "Registration Successfull!");
            res.redirect("/login");
        } catch(err) {
            console.log(err)
        }
    })

module.exports = router;