/*
 * @Descripttion: 获取该boss创建的职位
 * @version: 
 * @Author: tll
 * @Date: 2019-07-05 14:26:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-05 18:26:39
 */
const express = require('express');
const router = express.Router();
const model = require('../mongo-model/model');
const BossJob = model.getModel('bossJob')
router.get('/',(req,res)=>{
    let username = req.param('username')
    BossJob.find({username},(err,res)=>{
        res.json({
            msg:'获取职位成功',
            code:1,
            count:12,
            joblist:res
        })
    })
})
module.exports = router;