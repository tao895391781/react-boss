/*
 * @Descripttion: 设置职位地区
 * @version: 
 * @Author: tll
 * @Date: 2019-06-20 15:55:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-11 15:41:34
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const JobArea = model.getModel('user')
router.post('/',(req,res)=>{
    console.log(req.body)
    const {username,jobArea} = req.body;
    JobArea.find()
    .where({username})
    .update({$set:{jobArea}},(err,data)=>{
        if(err) throw new Error(err)
        console.log('更新地区成功',data);
        res.json({
            msg:'更新地区成功',
            code:1,
            jobArea
        })
    })
})
module.exports = router;