const express = require('express')
const cors = require('cors');
const env = require('dotenv');
const morgan = require('morgan');
const connectDb = require('./config/connectDb');
//rest obj
const app =express();

env.config();

//db call
connectDb();

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT =process.env.PORT || 8080;
//routes
app.get('/',(req,res)=>{
    res.send("Welcome to the API")
})

app.listen(PORT ,()=>{
    console.log(`server running on ${PORT}`);
})

