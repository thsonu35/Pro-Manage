const express = require("express");
const router = express.Router();
const {register , loginUser , allUsers} = require("../controller/user")



router.get ("/", (req,res) => {
    res.status(200).send("auth routes")
});

router.post ("/register", register);

router.post("/login", loginUser);

router.get("/allUsers", allUsers );




module.exports = router;