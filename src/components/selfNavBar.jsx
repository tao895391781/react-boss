/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-05-22 10:23:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-12 14:20:32
 */
import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
@withRouter
class SelfNavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {   
        }
        this.goback = this.goback.bind(this)
    }
    goback(){
        this.props.history.go(-1)
    }
    render() {
        const {navBarText,showBack,showRight,showSet} = this.props;
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={showBack ? <Icon type="left" />:''}
                    onLeftClick={() => (showBack ? this.goback():'')}
                    rightContent = { 
                        (showRight ? (<Icon type='cross' onClick={()=>this.props.setShowFixWindow(false)} />):'') ||
                        (showSet ? (<i className='iconshezhi iconfont'  onClick={this.props.jobManage} />):'')
                    }
                    >{navBarText}</NavBar> 
            </div>
        )
    }
}

export default SelfNavBar