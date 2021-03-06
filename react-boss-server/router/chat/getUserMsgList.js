/*
 * @Descripttion: 获取新消息
 * @version: 
 * @Author: tll
 * @Date: 2019-09-01 14:13:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-19 11:42:38
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const Chat = model.getModel('chat')
router.get('/',(req,res)=>{
    const _id = req.param('_id')
    Chat.find({$or:[{to:_id},{from:_id}]},{__v:0},(err,doc)=>{
        // console.log('获取的一对一聊天数据',doc)
        if(!err){
            res.json({
                code:1,
                msgList:doc
            })
        }
    })
})
module.exports = router