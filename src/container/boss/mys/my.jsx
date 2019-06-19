/*
 * @Descripttion: 我的--page
 * @version: 
 * @Author: tll
 * @Date: 2019-05-18 14:20:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-06-06 14:25:01
 */
import React from 'react'
import {Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {clearUserInfo,navBarText} from '@/redux/action'
@connect(null,{clearUserInfo,navBarText})
class My extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.exit = this.exit.bind(this);
    }
    exit = ()=>{
        console.log('退出登录');
        //初始化状态
        console.log(this.props)
        const {clearUserInfo,navBarText} = this.props;
        clearUserInfo();
        navBarText('职位')
        this.props.history.replace('/login');
    }
    render() {
        return (
            <div className='pagebox'>
               我的界面 
                <Button type='warning' onClick= {this.exit}>退出</Button>
            </div>
        )
    }
}

export default My