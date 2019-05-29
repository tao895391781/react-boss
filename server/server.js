const express  = require('express')
const Router = express.Router();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// import {User} from './schema.js'
const app = express();
const DB_URL = 'mongodb://localhost:27017/react-boss-db'
Router.all("*",function(req,res,next){ 
    //设置允许跨域的域名，*代表允许任意域名跨域 
    res.header("Access-Control-Allow-Origin","*"); 
    //允许的header类型 
    res.header("Access-Control-Allow-Headers","content-type");
     //跨域允许的请求方式 
     res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS"); 
     if (req.method.toLowerCase() === 'options') 
     res.send(200); 
     //让options尝试请求快速结束 
     else next(); 
    })
    Router.post('/register',(req,res)=>{
    console.log(req);
    res.json({message:1})
})
// const Users = mongoose.model('user',new mongoose.Schema({
//     user:{type:String,require:true},
//     age:{type:Number,require:true}
// }));
// Users.create({
//     user:'tll',ter
//     age:25
// },(err,doc)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(doc);
//         app.get('/',(req,res)=>{
//             res.json(doc)
//         })
//     }
// })


mongoose.connect(DB_URL);
mongoose.connection.on('connected',()=>{
    console.log('mongo connect-- success');
})
app.listen(9876,()=>{
    console.log('成功监听---端口9876');
})