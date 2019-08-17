/*
 * @Descripttion: 获取在线建立
 * @version: 
 * @Author: tll
 * @Date: 2019-07-26 11:03:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-26 15:47:19
 */
const express = require('express');
const router = express.Router();
const model = require('../../../mongo-model/model');
const WorkerOnlineCV = model.getModel('workerOnlineCV')

router.get('/',(req,res)=>{
    const username = req.param('username')
    WorkerOnlineCV.findOne({username},(err,doc)=>{
        if(err) throw new Error(err)
        if(!doc){
            res.json({
                msg:'暂无在线简历',
                code:1,
                onlinecv:{
                    jobHope:[],
                    jobStatus:''
                }
            })
        }else{
            res.json({
                msg:'查找成功',
                code:1,
                onlinecv:doc
            })
        }
    })
})
module.exports = router