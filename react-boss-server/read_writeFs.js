/*
 * @Descripttion: 文件的读取和写入
 * @version: 
 * @Author: tll
 * @Date: 2019-09-17 14:00:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-18 18:03:09
 */
const fs = require('fs');
const path = require('path')
//写入文件/读取文件
//创建一个文件写入流/读取流
const filePath = path.join(__dirname,'users.json')
const fsWriteStream = fs.createWriteStream(filePath)

//查看文件信息
const watchFileStat = ()=>{
    return new Promise((resolve,reject)=>{
        fs.stat(filePath,(err,stats)=>{
            if(err){
                reject(err)
            }else{
                console.log('文件信息-----------------\n');
                resolve(stats.size)   
            } 
        })   
    })
}
const writeFile = (data)=>{
    return new Promise((resolve,reject)=>{
        fsWriteStream.write(data,'utf-8',(err)=>{
            if(err){
                reject(err)
                return 0;
            }   
            console.log('文件写入成功')
        })  
    }) 
}
//读取文件
const readFile = ()=>{
    const fsReadStream = fs.createReadStream(filePath)
    console.log('正在读取文件....\n');
    return new Promise((resolve,reject)=>{
        let data = ''
        fsReadStream.on('data',(chunk) => {
            data += chunk
        });
        fsReadStream.on('end',()=>{
            console.log('文件读取完成!\n');
            fsReadStream.destroy();
            console.log('销毁流')
            resolve(data)
        })
        fsReadStream.on('error',(err)=>{
            console.log('文件读取失败!');
            reject(err)
        })
    })
}
module.exports = {watchFileStat,writeFile,readFile}