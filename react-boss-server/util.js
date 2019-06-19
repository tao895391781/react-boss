/*
 * @Descripttion: md5加密
 * @version: 
 * @Author: tll
 * @Date: 2019-05-31 10:34:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-05-31 14:40:02
 */
const utils = require('utility');
const md5Pwd = (pwd)=>{
    console.log('----------',pwd);
    let str = '__$%^xcaddASDdddadd__@#$';
    return utils.md5(utils.md5(pwd + str)); 
}
module.exports = {
    md5Pwd
}