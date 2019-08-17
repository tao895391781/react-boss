/*
 * @Descripttion: 模糊搜索公司
 * @version: 
 * @Author: tll
 * @Date: 2019-06-30 17:18:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-11 15:41:21
 */

const express = require('express');
const router = express.Router();
const model = require('../../mongo-model/model');
const Company = model.getModel('company')
router.get('/',(req,res)=>{
    let name = req.param('name');
    Company.find({$or:[{name:{'$regex':name}}]},{_id:0})
    .exec((err,companys)=>{
        if(err) return (
            res.json({
                code:1,
                msg:'查找失败',
                companys:[]
            })
        )
        console.log('公司',companys)
        res.json({
            code:1,
            msg:'查询成功',
            companys:companys
        })
    })
})

module.exports =  router;