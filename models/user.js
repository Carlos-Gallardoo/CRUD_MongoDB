/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = Schema({
    // email:{type: String, unique:true,lowercase:true},
    username:{
      type:String,
      required:true,
      unique:true,
      dropDups: true
    },
    password:{
        type:String,
        required:true,
    }
    });
    
    userSchema.pre('save', function (next){
        const user = this;
        bcrypt.hash(user.password, 10, (error,hash)=>{
            user.password = hash;
            next();
        });
    });
    const User = mongoose.model('user',userSchema);

    module.exports = User;