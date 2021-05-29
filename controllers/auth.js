
const User = require('../models/user'); // for the structure 

const {errorHandler} = require('../helpers/dbErrorHandler');



exports.signup = (req, res) => {
    console.log('req.body:',req.body);
    const user = new User(req.body); // this is name we exported the user schema with
    user.save((err,user)=>{
        if(err){ 
            return res.status(400).json({
                err : errorHandler(err)
            });        
        }

        //  preventing them  from exposing and getting to user as a response 
        user.salt = undefined 
        user.hashed_password = undefined 

        res.json({ 
            user
        });
    });
};  





const jwt = require("jsonwebtoken"); // this is to generate signed token 
const expressjwt = require("express-jwt"); // for authorization check 


exports.signin= (req,res)=>{
    // find the user based on Email
    const {email, password}= req.body
    User.findOne({email},(err, user)=>{       // findone funtion us to find the email from the database
        if ( err || !user ){
            return res.status(400).json({
                error : "User with this email does not exist please signup"
            });
        }   
        // if the user is found than lets authorize
        if (!user.authenticate(password)){
            return res.status(401).json({    // 401 is for unauthorized access
                error: "email and pass dont match "
            })
        }


        
        //generate a signed token for user id and secerat
        const token = jwt.sign({_id: user.id},process.env.JWT_SECRET);
        // persist the token as "tok" in cookie with expiray date 
        res.cookie('tok',token, {expire: new Date() + 14400});
        // return response with user and token to frontend client 
        const {_id, name, email, role }= user;   // using desstruct to ease the sending of the user

        return res.json({token,  user:{_id, name, email, role }});





    })




};


exports.signout = (req,res)=>{
    res.clearCookie('tok');
    res.json({message : "signed out!!"});
};

exports.greet = (req, res) => {
    res.json({
        message: "Hello from the Controller"
    });
};

// this need the cookie parser installed which we did in the app.js
exports.requireSignin = expressjwt ({  // this is a midllware to protect any routes 
    secret: process.env.JWT_SECRET,  
    algorithms: ["HS256"],          
    userProperty : "auth"


});


