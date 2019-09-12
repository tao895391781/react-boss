/*
 * @Descripttion: 消息--page
 * @version: 
 * @Author: tll
 * @Date: 2019-05-18 14:20:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-07 10:51:53
 */
import React from 'react'
import {connect} from 'react-redux'
import {getAllChatObj} from '@/redux/chat'
@connect(state=>({state:state}),{})
class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
            }
    }
    componentDidMount(){
       console.log(this.props);
       const {username} = this.props.state.loginSatate
       getAllChatObj(username).then(data=>{
            console.log(`获取${username}全部聊天对象`,data) 
       })
    }
    render() {
        return (
            <div className='pagebox'>
               消息界面 
            </div>
        )
    }
}

export default Message