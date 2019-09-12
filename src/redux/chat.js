/*
 * @Descripttion: 聊天列表
 * @version: 
 * @Author: tll
 * @Date: 2019-09-01 14:09:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-12 17:59:13
 */
import axios from 'axios'
import io from 'socket.io-client'
import {getUserMsgList,getAllChat} from '@/api'
const MSG_LIST = 'MSG_LIST'//获取聊天列表
const MSG_RECE = 'MSG_RECE'//接受聊天列表
const MSG_READ = 'MSG_READ'//未读的信息数量
let WsSocket = {};
export const asyncSaveSocket = ()=>{
    const socket = io('ws://192.168.1.114:4000/')
        return new Promise((resolve,reject)=>{
        socket.on('connect',()=>{
            console.log('socket.id--------------------------->',socket.id);
            WsSocket = socket;
            resolve({
                socket,
                socketId:socket.id
            })
        })  
    })  
}
const initState = {
    msgList:[],
    unread:0
}
export const chat = (state=initState,action)=>{
    switch(action.type){
            case MSG_LIST:
                return {...state,msgList:action.data,unread:action.data.filter(v=>!v.read).length}
            case MSG_RECE:
                console.log('接受一次消息')
                return {...state,msgList:[...state.msgList,action.data],unread:[...state.msgList,action.data].filter(v=>!v.read).length}
            case MSG_READ:
            default:
                return state   
    }
}
const chatList = (data)=>{
    return {type:MSG_LIST,data}
}
export const getChatList = (username)=>{
    return dispatch=>{
        axios.get(`${getUserMsgList}?username=${username}`).then(res=>{
            if(res.data.code === 1){
                console.log(res.data)
                dispatch(chatList(res.data.msgList))
            } 
        })
    }
}
//使用ws将聊天数据保存到数据库 
export const postChatInfo = (postdata)=>{
    console.log(WsSocket)
    console.log(postdata)
    WsSocket.emit('sendMsg',postdata);
}
const reviceChat = (data)=>{
    return {type:MSG_RECE,data}
}
//接受聊天信息
export const reviceChatInfo = (socket)=>{
    // socket.removeAllListeners() 
    return dispatch=>{
        socket.on('reciveMsg',(data)=>{
            console.log(data)
            dispatch(reviceChat(data))
        }) 
    }  
}
//根据用户名获取所有的聊天对象
export const getAllChatObj = (username)=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${getAllChat}?username=${username}`).then(res=>{
            resolve(res.data)
        })  
    })  
}
//用户退出聊天断开socket连接
export const outSocketline = ()=>{
    // socket.close();
}
