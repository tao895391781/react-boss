import {NAVBARTEXT,SHOWBACK} from  './action-type'
//顶部导航文字显示部分
export const navBarText = (data)=>{
    return {type:NAVBARTEXT,data:data}
}
export const showBack = (data)=>{
    return {type:SHOWBACK,data:data}
}