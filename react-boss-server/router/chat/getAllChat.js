/*
 * @Descripttion: 查找所有的聊天对象
 * @version: 
 * @Author: tll
 * @Date: 2019-09-01 14:13:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-19 15:28:46
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const Chat = model.getModel('chat')
router.get('/',(req,res,next)=>{
    const _id = req.param('_id')
    Chat.find({$or:[{from:_id},{to:_id}]}).exec((err,doc)=>{
        if(!err){
            res.json({
                code:1,
                msgList:doc
            })
        }
    })
})
module.exports = router