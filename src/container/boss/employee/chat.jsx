/*
 * @Descripttion: 聊天界面
 * @version: 
 * @Author: tll
 * @Date: 2019-08-31 16:53:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-12 15:05:50
 */
import React from 'react'
import {NavBar,Icon,List,TextareaItem,Button,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {getChatList,postChatInfo,reviceChatInfo} from '@/redux/chat.js'
import ChatCSS from './chat.scss'
import {createForm} from 'rc-form'
import ChatList from '@/components/chat-list'
import initScroll from '@/selfScroll'
import io from 'socket.io-client'
require('./chat.css')
// const socket = io('ws://192.168.1.114:4000');
// socket.on('connect',()=>{
//         console.log('content---------------------已连接1111111111')
//     })
@connect(
    state=>({state:state}),{getChatList,reviceChatInfo}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg:[],   

        }
    }
    componentDidMount(){
        console.log(this.props.state.chat.msgList)
        // this.props.getChatList()
        // this.props.reviceChatInfo();
        initScroll(this.wrapper ,{})
        this.betterScroll = initScroll(this.wrapper,{});
        const {scrollerHeight} = this.betterScroll;
        this.wrapperboxHeight = document.querySelector(".wrapperbox").clientHeight;
        this.betterScroll.scrollTo(0,-(scrollerHeight - this.wrapperboxHeight),0)
    }
   componentWillUnmount(){
       clearTimeout(this.timer);
   }
    componentWillReceiveProps(nextprops){
        if(nextprops.state.chat.msgList.length!==this.props.state.chat.msgList.length){
            console.log('刷新');
            this.betterScroll.refresh(); 
            const {scrollerHeight} = this.betterScroll;
            if(scrollerHeight >= this.wrapperboxHeight){
                this.timer = setTimeout(()=>{
                    //计算每次发送信息要滚动的距离 = scroll实例最大滚动的距离 - scroll实例的 y 坐标
                    let scrollL = -(Math.abs(this.betterScroll.maxScrollY) - Math.abs(this.betterScroll.y));
                    this.betterScroll.scrollBy(0,scrollL,300)
                },50)
            } 
        }
    }
    sendText = ()=>{
        const {getFieldValue,setFieldsValue} = this.props.form;
        if(!getFieldValue('content') || (getFieldValue('content') && !(getFieldValue('content').replace(/\s+/g,"")))){
            Toast.fail('请输入消息',1)
            setFieldsValue({
                content:''
            });
            return;
        };
        const from = this.props.state.loginSatate.username;
        const to = parseInt(this.props.match.params.username);
        const content = getFieldValue('content');
        const chatid = [from,to].sort().join('_');
        postChatInfo({from,to,content,chatid})
        setFieldsValue({
            content:''
        });
    }
    render() {
        const {getFieldProps} = this.props.form;
        const {msgList} = this.props.state.chat;
        console.log(msgList)
        const from = this.props.state.loginSatate.username;
        return (
            <div className='flexBox chatcss'>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                    >
                    {this.props.location.state.name.split('')[0]}先生
                </NavBar>
                <div className={ChatCSS.chatBox+' wrapperbox'} ref={ref=> this.wrapper = ref}>
                    <ul>
                        {
                            msgList.map((msg,index)=>(
                                <ChatList key={index}
                                content={msg.content}
                                direction={parseInt(msg.from) === from ? 'right':'left'}></ChatList>
                            ))
                        }
                    </ul>    
                </div>
                <List>
                    <List.Item className={ChatCSS['chat-bgc']}
                    extra={<Button inline type='primary' size='small' onClick={this.sendText}>发送</Button>}>
                        <TextareaItem {...getFieldProps('content')}></TextareaItem>  
                    </List.Item>   
                </List>
            </div>
        )
    }
}

export default createForm()(Chat)