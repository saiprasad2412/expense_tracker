const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is required']
    },
    email:{
        type: String,
        unique: true,
        required:[true , 'email is reuired and should be unique']
    },
    password:{
        type : String,
        required: [true,'Password is required'],
    }
},{timestamps:true})

const userModel =mongoose.model('users',userSchema);

module.exports=userModel;