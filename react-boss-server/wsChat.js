/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-09-04 11:00:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-19 14:47:54
 */
const model = require('./mongo-model/model');
const Chat = model.getModel('chat')
let userSocketObj = {};
const WSchat = (server)=>{
    const io = require('socket.io')(server)
    io.on('connection',(socket)=>{
        //保存登录进来的客户端
        // console.log('用户进来的-------',socket.id)
        // userClientArr.push(socket)
        // console.log('当前在线人数------',userClientArr.length)
        //接受客户端传来的用户id和socketid
        socket.on('login',(data)=>{
            console.log('用户登陆进来的信息',data)
            //先查看文件信息，当文件为空时，则不读取文件，直接写入
            let ifNoSocket = true;
            if(Object.keys(userSocketObj).length === 0){
                userSocketObj[data.userId] = socket;
            }else{
                for(let o in userSocketObj){
                    if(userSocketObj[o] === data.userId){
                        userSocketObj[o] = socket;
                        ifNoSocket = false;
                        break;
                    }
                }
                ifNoSocket && (userSocketObj[data.userId] = socket);
            }
        })
        socket.on('sendMsg',(data)=>{
            console.log('接收到的消息=>',data);
            const {from,to,content} = data;
            const chatid = [from,to].sort().join('_');
            const createTime = new Date().getTime();
            Chat.create({chatid,from,to,content,createTime},(err,doc)=>{
                if(!err){
                    console.log('接受发送的消息',doc._doc)
                    //发送给自己
                    userSocketObj[from].emit('reciveMsg',Object.assign({},doc._doc))
                    //发送给接收消息的一方
                    userSocketObj[to].emit('reciveMsg',Object.assign({},doc._doc))
                }
            })
        })
    })  
}
module.exports = WSchat;
