const mongoose  = require('mongoose');
const UserSchema = mongoose.Schema({
    phone:Number,
    pwd:String
})
const User = mongoose.model('User',UserSchema)
module.exports = User;