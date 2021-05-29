const mongoose = require("mongoose");

// for  virtual part
const crypto = require('crypto');
const {v1 : uuidv1} = require('uuid')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // for the space before and after 
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true, // for the space before and after 
        required: true,
        unique: true  // it should be unique
    },

    hashed_password: {
        type: String,
        required: true,
    },

    about_user: {
        type: String,
        trim: true, // for the space before and after
    },
    salt: String,

    role: {
        type: Number,
        default: 0
    },

    history: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
)


//virtual fields 
// we are going to use the userSchema to call the methods as shown 
userSchema
    .virtual('password')
    .set(function(password)
    {
            //console.log('his._password',this._password);
            this._password = password;
            //console.log('this._password',this._password);
            this.salt = uuidv1();
            //console.log('this.salt',this.salt);
            this.hashed_password = this.encryptPassword(password);
            //console.log('this.hashed_password',this.hashed_password);
    }
    )
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plaintext){
        return this.encryptPassword(plaintext)=== this.hashed_password;
    },



    encryptPassword:  function(password) {
        
        if(!password) return '';
        try {
            //console.log('we have a pass', crypto.createHmac('sha1', this.salt));
            return crypto.createHmac('sha1', this.salt)
                .update(password)// correction here in update spelling mistake
                .digest('hex');           // search crypto on documentaion on node js for example

        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model("User", userSchema);