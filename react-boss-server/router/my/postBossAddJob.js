/*
 * @Descripttion: boss添加职位
 * @version: 
 * @Author: tll
 * @Date: 2019-07-05 14:24:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-11 15:41:16
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const BossJob = model.getModel('bossJob')
router.post('/',(req,res)=>{
    console.log(req.body);
    let data = req.body;
    console.log(data)
    BossJob.create(data,(err,result)=>{
        if(err) throw new Error(err);
        console.log('添加职位结果',result)
        res.json({
            msg:'添加职位成功',
            code:1,
        })
    })
})
module.exports = router;