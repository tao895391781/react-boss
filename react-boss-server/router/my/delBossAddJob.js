/*
 * @Descripttion: boss删除职位
 * @version: 
 * @Author: tll
 * @Date: 2019-07-12 14:29:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-12 14:33:50
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const BossJob = model.getModel('bossJob')
router.post('/',(req,res)=>{
    console.log(req.body);
    let _ids = req.body;
    BossJob.deleteMany({ _id: { $in: _ids}},(err,res1)=>{
        if(err) throw new Error(err)
        console.log('删除成功',res1)
        res.json({
            msg:'删除成功',
            code:1
        })
    });
})
module.exports = router;