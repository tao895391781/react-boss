/*
 * @Descripttion: 获取该boss创建的职位
 * @version: 
 * @Author: tll
 * @Date: 2019-07-05 14:26:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-12 09:37:26
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const BossJob = model.getModel('bossJob')
router.get('/',(req,res)=>{
    let username = req.param('username')
    BossJob.find({username},(err,res1)=>{
        res.json({
            msg:'获取boss职位成功',
            code:1,
            joblist:res1
        })
    })
})
module.exports = router;