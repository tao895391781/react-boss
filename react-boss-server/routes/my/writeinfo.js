/*
 * @Descripttion: 用户写入信息
 * @version: 
 * @Author: tll
 * @Date: 2019-06-28 15:18:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-11 15:41:26
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const User = model.getModel('user')
router.post('/',(req,res)=>{
    console.log(req.cookies);
    const {data,username} = req.body;
    User.findOne({username},(err,doc)=>{
        if(err) throw new Error(err)
            console.log(doc);   
        }).update({$set:data},(err,res1)=>{
                if(err) throw new Error(err);
                console.log('写入数据成功',res1);
                res.json({
                    msg:'修改成功',
                    code:1
                })
            }) 
    })
module.exports = router;