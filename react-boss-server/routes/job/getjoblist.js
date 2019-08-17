/*
 * @Descripttion: 用户注册
 * @version: 
 * @Author: tll
 * @Date: 2019-05-26 15:20:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-02 14:35:03
 */
const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const BossJob = model.getModel('bossJob')
router.get('/', (req, res, next)=>{
    let page = req.param('page');//当前请求的页数
    console.log('当前的页数',page)
    let pageSize = 5;//每页显示多少条
    BossJob.count({},(err,count)=>{
        if(err){
            console.log('查询出错',err)
            res.json({
                msg:'fail',
                code:0,
                joblist:[],
            });
        }
        console.log('总职位:'+ count);
        BossJob.find({})
        .sort({_id:-1})
        .skip(pageSize *(page-1))
        .limit(pageSize)
        .then(data=>{
            if((count / pageSize) > page){
                res.json({
                    msg:'success',
                    code:1,
                    joblist:data,
                })
            }else{
                res.json({
                    msg:'success',
                    code:1,
                    less:true,
                    joblist:data,
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
module.exports = router;
