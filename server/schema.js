const mongoose = require('mongoose');
//用户
export const User = mongoose.model('user',new mongoose.Schema({
    phone:{type:Number,require:true},
    pwd:{type:String,require:true}
}));