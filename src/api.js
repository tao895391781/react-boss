/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-05-26 11:57:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-07 10:46:17
 */
const ip = {
    path:'http://192.168.1.114:4000'
};
export const register = ip.path + '/register';//注册
export const login  = ip.path+'/login'//登录
export const getjoblist = ip.path + '/getjob'//获取职位

export const setJobarea = ip.path + '/setJobarea'//设置地区---职位的筛选
export const writeinfo = ip.path +'/writeinfo'//写入用户信息
export const getinfo = ip.path + '/getinfo'//获取用户设置
export const getcompanyByName = ip.path + '/getcompany'//获取用户设置
export const postBossAddJob = ip.path +'/postBossAddJob'//boss添加职位
export const getBossAddJob =  ip.path +'/getBossAddJob'//获取boss职位
export const updateBossAddJob = ip.path +'/updateBossAddJob'//更新boss职位
export const deleteBossAddJob = ip.path +'/deleteBossAddJob'//删除boss职位
export const updateAddHopeJob = ip.path + '/updateAddHopeJob' //更新添加职业期望
export const getOnlinecv =       ip.path + '/getOnlinecv'    //获取在线简历
export const getEmployee = ip.path +'/getEmployee'//获取所有的牛人求职职位
export const getUserMsgList = ip.path +'/getUserMsgList'//获取聊天信息
export const getAllChat = ip.path +'/getAllChat'//获取所有的聊天对象