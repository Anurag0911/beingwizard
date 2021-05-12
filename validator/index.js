exports.userSignupValidator = (req,res, next) =>{
    req.check('name','Name is required').notEmpty();
    req.check('email','Email must be 3 to 32 character long')
        .matches(/.+@.+\..+/)
        .withMessage('email must contain @')
        .isLength({
            min: 4,
            max : 32
        }); 
    req.check('password','Password cannot be emoty').notEmpty();
    req.check('password',)
        .isLength({ min : 6 })
        .withMessage('pass must be atleast 6 character long ')
        .matches(/ \d /)
        .withMessage('passwaird must contain a number');
        const errors = req.validationErrors();
        if  (errors){
            const firstError = errors.map(error => error.msg)[0];
            return res.status(400).json({error:firstError});

        }
        next();//anytime we are creating a middleware we need to have a next function
};