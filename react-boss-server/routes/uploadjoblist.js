/*
 * @Descripttion: 获取工作职位，从boss网页中爬取
 * @version: 
 * @Author: tll
 * @Date: 2019-05-31 17:38:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-06-05 15:58:56
 */
const express = require('express');
const http = require('http');
const https = require('https') 
const cheerio = require('cheerio')
const router = express.Router();
const Job = require('../mongo-model/model').getModel('job')
router.get('/', (req, res, next)=>{
    let page = req.param('page') || 1;
    console.log(page)
    let url = `https://www.zhipin.com/c101010100/?page=${page}&ka=page-${page}`;
    let chunks  =[];
    let size = 0;
    let data = [];
    https.get(url,(res1)=>{
        res1.on('data',function(chunk){   //监听事件 传输
            chunks.push(chunk);
            size += chunk.length
        }); 
        res1.on('end',()=>{
            data = Buffer.concat(chunks,size); 
            let html = data.toString();
            let $ = cheerio.load(html);
            let jobs = [];
            let joblist = $('.job-list>ul>li');
            joblist.each(function(item){
                let job = {};
                job.name = $(this).find('.info-primary .job-title').text();
                let add = [];
                $(this).find('.info-primary>p').contents().each(function(){
                    if(this.type=== 'text'){
                        add.push(this.data)
                    }
                })
                job.intro = add;
                job.red = $(this).find('.info-primary .red').text();
                job.company= $(this).find('.info-company h3 a').text();
                let company_desc  = [];
                $(this).find('.company-text>p').contents().each(function(){
                    if(this.type=== 'text'){
                        company_desc.push(this.data);
                    }
                })
                job.companyDesc  = company_desc[1]
                let person = [];
                $(this).find('.info-publis .name').contents().each(function(){
                    if(this.type=== 'text'){
                        person.push(this.data);
                    }
                });
                job.person = person[0];
                job.personDesc = person[1] || '招聘者';
                job.headImg =  $(this).find('.info-publis .name img').attr('src');
                jobs.push(job)
            });
            Job.create(jobs,(err,data)=>{
                if(err) console.log('错误'+err);
                res.json({
                    meg:'上传职位成功',
                    code:1,
                    count:data.length
                })
            })
        })
    })
});
module.exports = router;
