/*
 * @Descripttion: 用户登录
 * @version: 
 * @Author: tll
 * @Date: 2019-05-29 16:17:18
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-05-29 16:38:07
 */
const express = require('express');
const router = express.Router();
const model = require('../mongo-model/model');
const User = model.getModel('user');

router.post('/',(req,res,next)=>{
    const {username,pwd} = req.body;
    console.log(username);
    User.find({username},(err,doc)=>{
        if(err) console.log(err);
        console.log(doc);
        if(doc.length!==0){
            if(pwd === doc[0].pwd){
                res.json({
                    message:'登录成功',
                    code:1
                })
            }else{
                res.json({
                    message:'密码错误',
                    code:0
                }) 
            }
        }else{
            res.json({
                message:'用户不存在',
                code:0
            })
        }
    })
    
})
module.exports = router;