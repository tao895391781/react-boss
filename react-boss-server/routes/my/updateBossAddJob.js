/*
 * @Descripttion: 更新boss创建的职位
 * @version: 
 * @Author: tll
 * @Date: 2019-07-05 14:26:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-11 18:12:27
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const BossJob = model.getModel('bossJob')
router.post('/',(req,res)=>{ 
    const {username,_id,data} = req.body;
    console.log(data)
    BossJob.findOneAndUpdate({username,_id},data,{new:true},(err,res1)=>{
        if(err) throw new Error(err)
        console.log('更新成功',res1)
        res.json({
            msg:'更新成功',
            code:1,
            newjoblist:res1
        })
    })
})
module.exports = router;