import {NAVBARTEXT,SHOWBACK,SUCCESS_LOGIN,CLEAR_LOGIN,ERRMSG,JOBLIST,IFGETNEWJOB,IFJOBEND,SAVEPERSONSET} from  './action-type'
import axios from 'axios';
import {getjoblist,writeinfo,getinfo} from '@/api.js'
//顶部导航文字显示部分
export const navBarText = (data)=>{
    return {type:NAVBARTEXT,data}
}
//顶部header组件左侧显示返回按钮
export const showBack = (data)=>{
    return {type:SHOWBACK,data}
}
// 错误信息
export const errMsg = (data)=>{
    return {type:ERRMSG,data}
}
// 保存用户信息
export const saveUserInfo = (data)=>{
    return {type:SUCCESS_LOGIN,data}
}
// 用户退出清除用户信息
export const clearUserInfo = (data)=>{
    return {type:CLEAR_LOGIN,data}
}
export const ifgetnewJob=(data)=>{
    return {type:IFGETNEWJOB,data}
}
export const JobList = (data)=>{
    return {type:JOBLIST,data}
}
export const ifJobEnd = (data)=>{
    return {type:IFJOBEND,data}
}
// 异步获取职位
export const getJobList = (page,show,hide,ifrefresh,showrefresh)=>{
    console.log('异步获取职位列表')
    show();
    return (
        dispatch=>{
                axios.get(getjoblist+`?page=${page}`).then(res=>{     
                    console.log(res.data);
                    if(showrefresh) showrefresh();
                    if(res.data.joblist.length !== 0){
                        dispatch(JobList({
                            data:res.data.joblist,
                            page,
                            ifrefresh
                        }));
                    }
                    if(res.data.less){
                        dispatch(ifJobEnd(true))
                    }else{
                        dispatch(ifJobEnd(false))
                    }
                    hide()
                }).catch(err=>{
                    console.log(err)
                    dispatch(errMsg('服务器出错了')) 
                })   
        }
    )
}
//保存个人设置
export const savePersonSet = (data)=>{
    return {type:SAVEPERSONSET,data}
}
//异步保存个人设置
export const asyncSavePersonSet = (postdata)=>{
    console.log(postdata)
    return (
        dispatch=>{
            return new Promise((resolve,reject)=>{
                axios.post(writeinfo,postdata).then(res=>{
                    console.log(res.data)
                    if(res.data.code === 1){
                        dispatch(savePersonSet(postdata.data));
                        resolve(res.data)
                    }     
                }).catch(err=>{
                    dispatch(errMsg('服务器出错了'))
                })
            })   
        }
    )
}
// 异步获取个人设置
export const asyncGetPersonSet = (param)=>{
    return (
        dispatch=>{
            return new Promise((resolve,reject)=>{
                axios.get(`${getinfo}?username=${param}`).then(res=>{
                    if(res.data.code ===1){
                        dispatch(savePersonSet(res.data.data));
                        resolve(res.data.data) 
                    }
                })
            })
        }
    )
}

