/*
 * @Descripttion: 用户注册
 * @version: 
 * @Author: tll
 * @Date: 2019-05-26 15:20:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-11 15:42:11
 */
const express = require('express');
const router = express.Router();
const model = require('../mongo-model/model');
const {md5Pwd} = require('../util')
const User = model.getModel('user')
router.post('/', (req, res, next)=>{
  const {username,pwd,type} = req.body;
  User.find({username:username},(err,doc)=>{
    if(err) throw new Error(err);
    console.log('doc',doc);
    if(doc.length!==0){
      // 用户存在
       res.json({
         message:'用户已存在',
         code:0
       })
    }else{
      // 用户不存在，插入该数据
      User.create({username,pwd:md5Pwd(pwd),type},(err,data)=>{
        if(err) return err;
        console.log('插入用户成功',data);
        res.json({
         message:'插入用户成功',
         code:1
       })
      })
    }
  })
});
module.exports = router;
