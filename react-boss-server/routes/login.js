/*
 * @Descripttion: 用户登录
 * @version: 
 * @Author: tll
 * @Date: 2019-05-29 16:17:18
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-05-31 16:58:34
 */
const express = require('express');
const router = express.Router();
const model = require('../mongo-model/model');
const User = model.getModel('user');
const {md5Pwd} = require('../util')
router.post('/',(req,res,next)=>{
    const {username,pwd,type} = req.body;
    console.log(username,pwd);
    User.findOne({username},{'__v':0},(err,doc)=>{
        if(err) console.log(err);
        console.log(doc);
        if(doc){
            console.log(md5Pwd(pwd) === doc.pwd);
            if(md5Pwd(pwd) === doc.pwd){
                if(type === doc.type){
                    res.cookie('userid',doc._id)
                    return res.json({
                        message:'登录成功',
                        status:'success',
                        code:1,
                        info:{
                            username,
                            _id:doc._id,
                            type,
                        }
                    });
                }else{
                    res.json({
                        message:'身份错误，请重新选择身份',
                        status:'id_err',
                        code:0
                    }) 
                }   
            }else{
                res.json({
                    message:'密码错误',
                    status:'pwd_err',
                    code:0
                }) 
            }
        }else{
            res.json({
                message:'用户不存在',
                status:'user_notfound',
                code:0
            })
        }
    })
    
})
module.exports = router;