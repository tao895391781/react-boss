/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-09-12 16:42:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-12 17:23:02
 */
import io from 'socket.io-client'
export const connectSocket = ()=>{
    const socket = io('ws://192.168.1.114:4000/')
    return new Promise((resolve,reject)=>{
        socket.on('connect',()=>{
            console.log('socket.id--------------------------->',socket.id)
            resolve({
                socket,
                socketId:socket.id
            })
        })  
    })  
}