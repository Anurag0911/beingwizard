// for the structure 
const User = require('../models/user');

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




exports.greet = (req, res) => {
    res.json({
        message: "Hello from the Controller"
    });
};



