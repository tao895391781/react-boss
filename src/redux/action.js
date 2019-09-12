/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-05-22 14:02:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-24 11:13:18
 */
import {NAVBARTEXT,SHOWBACK,SUCCESS_LOGIN,CLEAR_LOGIN,ERRMSG,JOBLIST,IFGETNEWJOB,IFJOBEND,SAVEPERSONSET,SAVEBOSSADDJOB,SAVEONLINECV,CLEARREDUX} from  './action-type'
import axios from 'axios';
import {getjoblist,writeinfo,getinfo,postBossAddJob,getBossAddJob,updateBossAddJob,deleteBossAddJob,updateAddHopeJob,getOnlinecv,getEmployee} from '@/api.js'
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
//清空redux
export const clearRedux = (data)=>{
    return {type:CLEARREDUX,data}
}
// 异步获取职位
export const getJobList = (page)=>{
    console.log('异步获取职位列表')
            return new Promise((resolve,reject)=>{
                axios.get(getjoblist+`?page=${page}`).then(res=>{     
                    console.log(res.data);
                    resolve(res.data)
                }).catch(err=>{
                    console.log(err)
                })
            })   
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
// 保存boss创建的职位
const saveBossJob = (data)=>{
    return {type:SAVEBOSSADDJOB,data}
}
//获取boss创建的职位
export const asyncGetBossJob = (username)=>{
    return (
        dispatch=>{
            return new Promise((resolve,reject)=>{
                axios.get(`${getBossAddJob}?username=${username}`).then(res=>{
                    console.log(res.data);
                    dispatch(saveBossJob(res.data.joblist));
                    resolve(res.data)
                })
            })
        }
    )
}
//创建boss创建的职位
export const asyncPostBossJob = (postdata)=>{
    return (
        dispatch=>{
                return new Promise((resolve,reject)=>{
                axios.post(postBossAddJob,postdata).then(res=>{
                    resolve(res.data);
                })
            })
        }
    )  
}
//更新boss创建的职位
export const asyncUpdateBossJob = (postdata)=>{
    return (
        dispatch=>{
            return new Promise((resolve,reject)=>{
                axios.post(updateBossAddJob,postdata).then(res=>{
                    console.log(res.data)
                    resolve(res.data)
                })
            })
        }
    )
}
//删除boss创建的职位
export const asyncDeleteBossJob = (postdata)=>{
    return (
        dispatch=>{
            return new Promise((resolve,reject)=>{
                axios.post(deleteBossAddJob,postdata).then(res=>{
                    console.log(res.data)
                    resolve(res.data)
                })
            })
        }      
    )
}
//添加职业期望
export const asyncAddHopeJob = (postdata)=>{
                return new Promise((resolve,reject)=>{
                    axios.post(updateAddHopeJob,postdata).then(res=>{
                        console.log(res.data)
                        resolve(res.data)
                    })
                }
            )
}
// const saveOnlinecv = (data)=>{
//     return {type:SAVEONLINECV,data}
// }
//异步获取牛人在线简历
export const asyncGetonlinecv = (param)=>{
    return (
        dispatch=>{
            return new Promise((resolve,reject)=>{
        axios.get(getOnlinecv+`?username=${param}`).then(res=>{
            resolve(res.data.onlinecv)
        })
        .catch(err=>{

        })
    })
        }
    )  
}
//获取所有的牛人求职职位
export const asyncGetEmployee = (page)=>{
    return new Promise((resolve,reject)=>{
        axios.get(getEmployee+`?page=${page}`).then(res=>{
            console.log(res.data);
            resolve(res.data)
        })
    })
}
//获取个人信息
export const asyncGetWorkerInfo = (username)=>{
    return new Promise((resolve,reject)=>{
        axios.get(getinfo + `?username=${username}`).then(res=>{
            console.log(res.data);
            resolve(res.data)
        })
    })
}
//保存牛人的最高学历
export const saveMostHightEdu = (data)=>{
    return {type:SAVEPERSONSET,data}
}


