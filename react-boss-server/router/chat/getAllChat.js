/*
 * @Descripttion: 查找所有的聊天对象
 * @version: 
 * @Author: tll
 * @Date: 2019-09-01 14:13:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-11 15:33:52
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const Chat = model.getModel('chat')
router.get('/',(req,res,next)=>{
    const username = req.param('username')
    Chat.find().or([{from:username},{to:username}]).exec((err,doc)=>{
        if(!err){
            res.json({
                code:1,
                msgList:doc._doc
            })
        }
    })
})
module.exports = router