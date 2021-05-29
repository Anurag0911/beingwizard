// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()

// for the uder signin
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



//import for the error in the filling of the form ie validator  
const expressValidator = require("express-validator");


// this is a comment

//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true,
    useCreateIndex: true

}
)
.then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

const express = require('express');
const app = express();
require('dotenv').config();



// //routes for starters
// app.get('/', (req, res)=>{
//     res.send('Updated !!! hello  from node');
// });

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());   // so that we get the jsaon data from the body 
app.use(cookieParser());   // that we can stop the data as cookies for transport purposes 
app.use(expressValidator());  // this is a old veriosn and will be updated sometime else 

// import routes
const userRoutes = require('./routes/auth');
const { json } = require('body-parser');




// routes from routes directry ie routes middleware 
app.use("/api", userRoutes);


//port variable
const  port  = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});