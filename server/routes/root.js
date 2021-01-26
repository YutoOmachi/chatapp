const express = require("express");
const path = require('path');
const router = express.Router()

router
    .route("/")
    .get((req,res) => {
        if(req.user){
            let reqPath = path.join(__dirname, "../../client/views/chat.ejs");
            res.render(reqPath, {username: req.user.username});        
        }
        else{
            res.redirect("/login");
        }
    })

module.exports = router;