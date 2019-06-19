import {NAVBARTEXT,SHOWBACK,SUCCESS_LOGIN,CLEAR_LOGIN,ERRMSG,JOBLIST,IFGETNEWJOB,IFJOBEND} from  './action-type'
import axios from 'axios';
import {getjoblist} from '@/api.js'
//顶部导航文字显示部分
export const navBarText = (data)=>{
    return {type:NAVBARTEXT,data:data}
}
//顶部header组件左侧显示返回按钮
export const showBack = (data)=>{
    return {type:SHOWBACK,data:data}
}
// 错误信息
export const errMsg = (data)=>{
    return {type:ERRMSG,data:data}
}
// 保存用户信息
export const saveUserInfo = (data)=>{
    return {type:SUCCESS_LOGIN,data:data}
}
// 用户退出清除用户信息
export const clearUserInfo = (data)=>{
    return {type:CLEAR_LOGIN,data:data}
}
export const ifgetnewJob=(data)=>{
    return {type:IFGETNEWJOB,data:data}
}
export const JobList = (data)=>{
    return {type:JOBLIST,data:data}
}
export const ifJobEnd = (data)=>{
    return {type:IFJOBEND,data:data}
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
