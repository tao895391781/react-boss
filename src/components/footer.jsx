/*
 * @Descripttion: footer
 * @version: 
 * @Author: tll
 * @Date: 2019-05-18 11:20:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-16 14:41:35
 */
import React from 'react'
import footercss from './footer.scss'
import {TabBar } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            selectedPath:'',
        }
        this.navlink = this.navlink.bind(this)
    }
    componentDidMount(){
        this.setState({
            selectedPath:this.props.history.location.pathname
        })
    }
    render() {
        let {navlist,unread} = this.props;
        console.log(navlist)
        const navlist_ = navlist.filter(nav=> nav.hidden)
        return (
                <div className = {footercss['footer-box']}>
                    <TabBar tintColor = '#108ee9'>
                        {
                            navlist_.map((item,index)=>(
                                <TabBar.Item 
                                    title={item.text}
                                    key={index}
                                    badge={item.text ==='消息' && unread}
                                    selected = {this.state.selectedPath === item.link}
                                    selectedIcon = {<i className={`iconfont ${item.icon}`} style={{color:'#108ee9'}}></i>}
                                    icon={<i className={`iconfont ${item.icon}`}></i>}
                                    onPress = {()=>{this.setState({selectedPath:item.link});this.navlink(item)}}
                                    >
                                </TabBar.Item>
                            ))
                        }
                    </TabBar>
                </div>
        )
    }
    navlink(item){
        if(this.props.history.location.pathname !== item.link){
            this.props.history.push(item.link);
            this.props.setNavBarText(item.text)
        } 
    }
}
export default withRouter(Footer)