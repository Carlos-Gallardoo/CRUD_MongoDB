/* jshint esversion: 6 */

const User = require('../models/user');
const path = require('path');
const bcrypt = require('bcrypt')
module.exports = (req,res) =>{

let user = new User();
user.username = req.body.username;
user.password = req.body.password;
user.save((err,user)=>{
    if(err){
       res.render('/users/register')
    }
    res.redirect('/users/login');
});
}