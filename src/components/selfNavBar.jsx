/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-05-22 10:23:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-05-23 16:09:14
 */
import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
class SelfNavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {   
        }
    }
    render() {
        console.log(this.props);
        const {navBarText,showBack} = this.props;
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={showBack ? <Icon type="left" />:''}
                    >{navBarText}</NavBar> 
            </div>
        )
    }
}

export default SelfNavBar