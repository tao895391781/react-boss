/*
 * @Descripttion: 包含多个reducer函数的模块
 * @version: 
 * @Author: tll
 * @Date: 2019-05-22 14:02:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-12 17:52:20
 */

import {combineReducers} from 'redux'
import {NAVBARTEXT,SHOWBACK,SUCCESS_LOGIN,CLEAR_LOGIN
    ,JOBLIST,IFGETNEWJOB,IFJOBEND,SAVEPERSONSET,SAVEBOSSADDJOB,SAVEONLINECV,NAVLIST,CLEARREDUX} from './action-type'
// 导航栏的文字
import {chat} from './chat'
const navBarText = (state='职位',action)=>{
    switch(action.type){
        case NAVBARTEXT:
        return action.data
        case CLEARREDUX:
            return '职位';
        default :
            return state;
    }
}
// 控制返回按钮
const showBack = (state = true,action)=>{
    switch(action.type){
        case SHOWBACK:
            return action.data
        case CLEARREDUX:
            return true;
        default:
            return state;
    }
}
const ifgetjobend = (state = false,action)=>{
    switch(action.type){
        case IFJOBEND:
            return action.data
            case CLEARREDUX:
            return false;
        default:
            return state
    }
}
// 保存用户信息
const workInfo = {
    username:'',
    isAuth:false,
    headImg:'',
    name:'',
    sex:'',
    workTime:'2018-08-08',
    wxNum:'',
    birth:'2000-01-01',
    myAdvantage:'',
    mostHightEdu:''
}
const loginSatate =(state = workInfo,action)=>{
    switch(action.type){
        case SUCCESS_LOGIN:
            return {...state,...action.data,isAuth:true}
        case SAVEPERSONSET:
            return {...state,...action.data}
        case CLEAR_LOGIN:
            return state;
        case CLEARREDUX:
            return workInfo;
        default:
            return state
    }
}
// 获取职位列表
const getJoblist = (state = [],action)=>{
    switch(action.type){
        case JOBLIST:
            return action.data
            case CLEARREDUX:
            return [];
        default:
            return state;
    }
}
// 判断职位数据是否没了
const ifgetnewjob = (state = 0,action)=>{
    switch(action.type){
        case IFGETNEWJOB:
            return action.data
            case CLEARREDUX:
            return 0;
            default:
            return state;
    }
}
const bossCreateJob = (state = [],action)=>{
    switch(action.type){
        case SAVEBOSSADDJOB:
            return action.data
            case CLEARREDUX:
            return [];
        default:
             return state;
    }
} 

const reducers = combineReducers({
    navBarText,
    showBack,
    loginSatate,
    getJoblist,
    ifgetnewjob,
    ifgetjobend,
    bossCreateJob,
    chat,
})
export default reducers;