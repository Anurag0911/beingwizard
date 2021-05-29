const express = require('express');
const router = express.Router();


const { signup , signin, signout, requireSignin} = require('../controllers/auth');
const { userSignupValidator } = require('../validator');


router.post("/signup", userSignupValidator, signup); // this validates "before" calling the signup funtion using express-validator
//router.post("/signup", signup);  // this does not validate 


router.post("/signin", signin); // this is for signin using express-jwt and jason token 



router.get("/signout", signout); 


// // this is for the testing of requireSignin funtion
// router.get("/hello", requireSignin,(req, res)=>{   // the route, the middleware, the handler
//      res.send("hello ");
// });


// // this is for the resting of the controller routes
// const { greet } = require('../controllers/user');
// router.get("/", greet);


// // this is for the testing of routes
// router.get("/",(req, res)=>{
//      res.send("hello from router ");
// });

module.exports = router;