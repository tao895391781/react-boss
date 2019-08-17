/*
 * @Descripttion: footer
 * @version: 
 * @Author: tll
 * @Date: 2019-05-18 11:20:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-01 14:50:51
 */
import React from 'react'
import footercss from './footer.scss'
import {withRouter} from 'react-router-dom'
class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {   
        }
        this.navlink = this.navlink.bind(this)
    }
    render() {
        let {navlist} = this.props;
        let navWidth= (100 / navlist.length).toFixed(2);
        const {pathname} = this.props.history.location
        let navlist_=  navlist.filter(v=>v.hidden)
        return (
                <ul className = {footercss['footer-box']}>
                    {
                        navlist_.map((item,index)=>{
                            return (
                                <li key={index} style={{"width":navWidth +'%'}} 
                                onClick={()=>this.navlink(item)}
                                className ={pathname === item.link ? footercss.navActive:''}>
                                    <p><i className={`iconfont ${item.icon}`}></i></p>
                                    <p><span>{item.text}</span></p>
                                </li>
                            )
                        })  
                    }
                </ul>
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