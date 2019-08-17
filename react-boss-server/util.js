/*
 * @Descripttion: md5加密
 * @version: 
 * @Author: tll
 * @Date: 2019-05-31 10:34:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-26 09:51:38
 */
const model = require('./mongo-model/model');
const Counter = model.getModel('counter');
const utils = require('utility');
//MD5加密
const md5Pwd = (pwd)=>{
    console.log('----------',pwd);
    let str = '__$%^xcaddASDdddadd__@#$';
    return utils.md5(utils.md5(pwd + str)); 
}
//返回自增字段

const autoAddIndex=(id)=>{
    return new Promise((resolve,reject)=>{
        Counter.findOne({_id:id},(err,doc)=>{
            if(err) throw new Error(err)
            if(!doc){
                Counter.create({_id:id,seq:1},(err,res1)=>{
                    if(err) throw new Error(err)
                    resolve(1)
                }) 
            }else{
                Counter.findOneAndUpdate({_id: id}, {$inc: { seq: 1} },{new:true}, (err, counter)=>{
                    if(err) throw new Error(err)
                    const {seq} = counter
                    resolve(seq)
                }) 
            }
        })
           
    })  
}
module.exports = {
    md5Pwd,
    autoAddIndex
}
