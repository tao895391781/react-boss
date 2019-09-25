/*
 * @Descripttion: 消息--page
 * @version: 
 * @Author: tll
 * @Date: 2019-05-18 14:20:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-19 15:03:01
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
       const {_id} = this.props.state.loginSatate
       getAllChatObj(_id).then(data=>{
            console.log(`获取${_id}全部聊天对象`,data) 
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