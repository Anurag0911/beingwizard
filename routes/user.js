const express = require('express');
const router = express.Router();

const { greet } = require('../controllers/user');
const { signup } = require('../controllers/user');
const { userSignupValidator } = require('../validator');


router.post("/signup", userSignupValidator, signup); // this validates "before" callimg the signup funtion
//router.post("/signup", signup);  // this foes not validate 
router.get("/", greet);



 router.get("/",(req, res)=>{
     res.send("hello from router ");
});

module.exports = router;