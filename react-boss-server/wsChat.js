/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-09-04 11:00:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-12 18:00:43
 */
const model = require('./mongo-model/model');
const Chat = model.getModel('chat')
let userClient = new Object();
const WSchat = (server)=>{
    const io = require('socket.io')(server)
    io.on('connection',(socket)=>{
        console.log('user login',socket.id)
        socket.on('sendMsg',(data)=>{
            console.log('接收到的消息=>',data);
            const {from,to,content} = data;
            const chatid = [from,to].sort().join('_');
            const createTime = new Date().getTime();
            Chat.create({chatid,from,to,content,createTime},(err,doc)=>{
                if(!err){
                    console.log('接受发送的消息',doc._doc)
                    socket.emit('reciveMsg',Object.assign({},doc._doc))
                    // socket.join(chatid,()=>{
                    //     console.log(socket.rooms)
                    //     socket.to(chatid).emit('reciveMsg',Object.assign({},doc._doc))
                    // })
                    // io.emit('reciveMsg',Object.assign({},doc._doc))
                }
            })
        })
    })  
}
module.exports = WSchat;
