/*
 * @Descripttion: 包含多个reducer函数的模块
 * @version: 
 * @Author: tll
 * @Date: 2019-05-22 14:02:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-05-23 16:06:43
 */

import {combineReducers} from 'redux'
import {NAVBARTEXT,SHOWBACK} from './action-type'

const navBarText = (state='',action)=>{
    switch(action.type){
        case NAVBARTEXT:
        return action.data
        default :
            return state;
    }
}
const showBack = (state = true,action)=>{
    switch(action.type){
        case SHOWBACK:
            return action.data
        default:
            return true;
    }
}
const reducers = combineReducers({
    navBarText,
    showBack
})
export default reducers;