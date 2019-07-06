/*
 * @Descripttion: 包含多个reducer函数的模块
 * @version: 
 * @Author: tll
 * @Date: 2019-05-22 14:02:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-04 09:34:11
 */

import {combineReducers} from 'redux'
import {NAVBARTEXT,SHOWBACK,SUCCESS_LOGIN,CLEAR_LOGIN,ERRMSG,JOBLIST,IFGETNEWJOB,IFJOBEND,SAVEPERSONSET} from './action-type'
// 导航栏的文字
const navBarText = (state='职位',action)=>{
    switch(action.type){
        case NAVBARTEXT:
        return action.data
        default :
            return state;
    }
}
// 控制返回按钮
const showBack = (state = true,action)=>{
    switch(action.type){
        case SHOWBACK:
            return action.data
        default:
            return state;
    }
}
const ifgetjobend = (state = false,action)=>{
    switch(action.type){
        case IFJOBEND:
            return action.data
        default:
            return state
    }
}
// 保存用户信息
const userInfo = {
    username:'',
    isAuth:false,
    name:'',
    headImg:'',
    sex:'',
    workTime:'2018-08-08',
    birth:'2000-01-01',
    wxNum:'',
    myAdvantage:'',
    company:'',
    myJob:'',
    myEmail:''
}
const loginSatate =(state = userInfo,action)=>{
    switch(action.type){
        case SUCCESS_LOGIN:
            console.log(action.data)
            return {...state,...action.data,isAuth:true}
        case SAVEPERSONSET:
            return {...state,...action.data}
        case CLEAR_LOGIN:
            console.log('-----清除信息')
            return userInfo;
        default:
            return state
    }
}
// 获取职位列表
const getJoblist = (state = {data:[],page:0,ifrefresh:''},action)=>{
    switch(action.type){
        case JOBLIST:
            return {...action.data}
        default:
            return state;
    }
}
// 判断职位数据是否没了
const ifgetnewjob = (state = 0,action)=>{
    switch(action.type){
        case IFGETNEWJOB:
            return action.data
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
})
export default reducers;