/*
 * @Descripttion: 获取一对一
 * @version: 
 * @Author: tll
 * @Date: 2019-09-19 11:42:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-19 13:46:43
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const Chat = model.getModel('chat')
router.get('/',(req,res)=>{
    const chatid= req.param('chatid')
    Chat.find({chatid},{__v:0},(err,doc)=>{
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