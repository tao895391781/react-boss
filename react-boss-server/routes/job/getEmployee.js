/*
 * @Descripttion: 获取牛人列表
 * @version: 
 * @Author: tll
 * @Date: 2019-08-01 17:49:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-03 16:43:26
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const WorkerOnlineCV = model.getModel('workerOnlineCV')
router.get('/', (req, res, next)=>{
    let page = req.param('page');//当前请求的页数
    console.log('当前的页数',page)
    let pageSize = 5;//每页显示多少条
    WorkerOnlineCV.count({},(err,count)=>{
        if(err){
            console.log('查询出错',err)
            res.json({
                msg:'fail',
                code:0,
                joblist:[],
            });
        }
    WorkerOnlineCV.find({})
    .sort({_id:-1})
    .skip(pageSize *(page-1))
    .limit(pageSize)
    .then(data=>{
        let data_ = [];
            data.forEach(v=>{
                v.jobHope.forEach(v1=>{
                    data_.push({...v1._doc,username:v.username})
                })
            })
            if((count / pageSize) > page){
                res.json({
                    msg:'success',
                    code:1,
                    joblist:data_,
                })
            }else{
                res.json({
                    msg:'success',
                    code:1,
                    less:true,
                    joblist:data_,
                })
            }
        }).catch(err=>{
            console.log(err)
            res.json({
                msg:'fail',
                code:0,
                joblist:[],
            });
        })
    })
});
module.exports = router