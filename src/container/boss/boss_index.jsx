/*
 * @Descripttion: Boss首页
 * @version: 
 * @Author: tll
 * @Date: 2019-05-16 11:32:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-01 17:28:09
 */
import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {navBarText,showBack} from '@/redux/action'
import Footer from '@/components/footer'
import SelfNavBar from '@/components/selfNavBar'
import Job from '@/container/boss/job/job'
import Employee from '@/container/boss/employee/employee'
import Company from '@/container/boss/company/company'
import Message from '@/container/boss/message/message'
import My from '@/container/boss/mys/my'
import BossRouter from '@/components/bossSwitch'
import bosscss from '@/container/boss/boss-index.scss'
const mapStatetoProps = (state) =>{
    return {state:state}
}
const actionCreators = {navBarText,showBack};
@connect(mapStatetoProps,actionCreators)
class Boss_index extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            navlist:[{
                    icon:'iconposition',
                    text:'职位',
                    link:'/boss/job',
                    component:Job,
                    hidden:props.state.loginSatate.type === 'worker'
                   
                },{
                    icon:'iconzhaorencaixiangao',
                    text:'招人',
                    link:'/boss/employee',
                    component:Employee,
                    hidden:props.state.loginSatate.type === 'boss'
                  
                },{
                    icon:'iconqiye-copy',
                    text:'公司',
                    link:'/boss/company',
                    component:Company,
                    hidden:true
                }, 
                {
                    icon:'iconxiaoxi1',
                    text:'消息',
                    link:'/boss/message',
                    component:Message,
                    hidden:true
                },
                {
                    icon:'iconIcon_wode',
                    text:'我的',
                    link:'/boss/my',
                    component:My,
                    hidden:true
                }]
        }
    }
    /* 组件挂在完之后执行的初始化 */
    componentDidMount(){
        console.log('boss_index渲染');
        console.log(document.cookie);
        // 未登录
        if(!document.cookie){
           this.props.history.replace('/login') 
           return;
        }
        console.log(this.props);
        const {showBack} = this.props;
        showBack(false);
    }
    componentWillUnmount(){
        console.log('boss_index卸载'); 
    }
    /* 控制导航栏的文字和分返回按钮 */
    setNavBarText(text){
        const {navBarText,showBack} = this.props;
        navBarText(text);
        showBack(false);
    }
    /* 组件渲染 */
    render() {
        console.log('render')
        const {navlist} = this.state
        const {navBarText,showBack} = this.props.state;
        return (
            <div className ='flexBox'>
                <header>
                    <SelfNavBar navBarText = {navBarText} showBack = {showBack}></SelfNavBar>
                </header>
                <div className = 'flex-container'> 
                    <BossRouter  navlist = {navlist} type = {this.props.state.loginSatate.type}/>
                </div>
                <div className = {bosscss.footer}>
                    <Footer navlist = {navlist} setNavBarText = {(text)=>this.setNavBarText(text)}></Footer>
                </div>
            </div>
        )
    }
}

export default Boss_index