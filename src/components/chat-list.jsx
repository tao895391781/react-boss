/*
 * @Descripttion: 聊天列表显示（模仿微信显示）
 * @version: 
 * @Author: tll
 * @Date: 2019-09-05 11:06:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-05 15:02:09
 */
import React from 'react'
import chatcss from './chat-list.scss'
const headImg = require('../static/img/headImg.jpg');
const headImg1 = require('../static/img/headImg1.jpg');
 export default function chatList(props){
    const {direction,content} = props;
    return (
        <li className={(direction === 'left' ? chatcss['chat-left']:chatcss['chat-right']) + ' '+ chatcss['common'] }>
            <img src={direction === 'left'?headImg:headImg1} alt='头像' 
            className={direction === 'right' ? chatcss['head-right']:''} /> 
            <p>
                <span>{content}</span>
                <b></b>
            </p>
        </li>
    )
}