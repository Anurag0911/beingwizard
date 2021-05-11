const express = require('express');
const router = express.Router();

const { greet } = require('../controllers/user');
const { signup } = require('../controllers/user');

router.post("/signup", signup);




router.get("/", greet);



// router.get("/",(req, res)=>{
//     res.send("hello from router ");
// });

module.exports = router;