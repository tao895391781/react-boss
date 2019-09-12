/*
 * @Descripttion: 聊天
 * @version: 
 * @Author: tll
 * @Date: 2019-09-01 14:13:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-11 15:45:22
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const Chat = model.getModel('chat')
router.get('/',(req,res)=>{
    const username = req.param('username')
    Chat.find({$or:[{to:username},{from:username}]},{__v:0},(err,doc)=>{
        console.log('获取的一对一聊天数据',doc)
        if(!err){
            res.json({
                code:1,
                msgList:doc
            })
        }
    })
})
module.exports = router