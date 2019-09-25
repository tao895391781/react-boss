/*
 * @Descripttion: 获取个人信息
 * @version: 
 * @Author: tll
 * @Date: 2019-06-29 11:00:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-19 10:55:20
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const User = model.getModel('user')
router.get('/',(req,res)=>{
    let username = req.param('username')
    console.log('cookie',req.cookie)
    User.findOne({username},{__v:0,pwd:0,type:0},(err,doc)=>{
        if(err) throw new Error(err)
            // console.log('doc',doc);
            res.json({
                msg:'查找成功',
                code:1,
                data:doc
            })    
        })  
    })
module.exports = router;