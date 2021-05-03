// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()

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


// import routes
const userRoutes = require('./routes/user')


// routes from routes directry ie routes middleware 
app.use("/api", userRoutes);


//port variable
const  port  = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});