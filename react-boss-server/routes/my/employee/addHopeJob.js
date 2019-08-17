/*
 * @Descripttion: 添加工作期望
 * @version: 
 * @Author: tll
 * @Date: 2019-07-24 16:09:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-15 14:37:27
 */
const express = require('express');
const router = express.Router();
const model = require('../../../mongo-model/model');
const WorkerOnlineCV = model.getModel('workerOnlineCV')
router.post('/',(req,res)=>{
    console.log(req.body)
    const {username,type,data,ifEdit} = req.body;
    // 先执行查找
    WorkerOnlineCV.findOne({username},{__v:0},(err,res1)=>{
        if(err) throw new Error(err)
        //不存在，则创建一个在线简历
        console.log(res1)
        if(!res1){
                    WorkerOnlineCV.create({username,[type]:data},(err,doc)=>{
                       res.json({
                        msg:`创建${type}期望成功`,
                        code:1
                    });
                });
        }else{
            //创建了在线简历，看是否添加了同种字段‘
            console.log(Object.keys(res1._doc))
            if(Object.keys(res1._doc).find(v=> v === type)){
               if(type === 'jobHope'){
                    //执行更新数组操作
                    if(ifEdit.type === 'update'){
                        for(let i = 0;i<res1.jobHope.length;i++){
                            if(res1[type][i]._id.toString() === ifEdit._id){
                                res1[type][i] = Object.assign(res1[type][i],data)
                                res1.markModified(type)
                                res1.save((err)=>{
                                    if(err) throw new Error(err)
                                    res.json({code: 1, msg: '修改成功'});
                                })
                            }
                        } 
                    }else if(ifEdit.type === 'delete'){
                        //执行数组删除操作
                        WorkerOnlineCV.update({$pull:{[type]:{_id:ifEdit._id}}},(err,res2)=>{
                            if(err) throw new Error(err)
                            console.log('删除',res2)
                                res.json({
                                    msg:`删除${type}成功`,
                                    code:1
                                })
                            })
                    }else if(ifEdit.type === 'add'){
                        //执行数组添加操作
                        WorkerOnlineCV.update({$push:{[type]:data}},(err,res2)=>{
                                if(err) throw new Error(err)
                                    res.json({
                                        msg:`添加${type}成功`,
                                        code:1
                                    })
                                }); 
                    }   
               }else{
                //执行更新操作----除了hopeJob
                WorkerOnlineCV.update({},{[type]:data},{new:true},(err,res3)=>{
                    if(err) throw new Error(err)
                    res.json({
                        msg:`更新${type}成功`,
                        code:1
                    })
                })
               }
            }else{
                //执行添加操作
                WorkerOnlineCV.update({},{$set:{[type]:data}},{new:true},(err,res4)=>{
                    if(err) throw new Error(err);
                    res.json({
                        msg:`添加${type}成功`,
                        code:1
                    })
                })
            }
        }
    }) 
})
module.exports = router