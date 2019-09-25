/*
 * @Descripttion: Boss首页
 * @version: 
 * @Author: tll
 * @Date: 2019-05-16 11:32:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-19 11:30:26
 */
import React from 'react'
import {connect} from 'react-redux'
import {navBarText,showBack} from '@/redux/action'
import {getChatList,reviceChatInfo,asyncSaveSocket} from '@/redux/chat.js'
import Footer from '@/components/footer'
import SelfNavBar from '@/components/selfNavBar'
import {navlist,childRouter} from '@/router'
import BossRouter from '@/components/bossSwitch'
import bosscss from '@/container/boss/boss-index.scss'
const mapStatetoProps = (state) =>{
    return {state:state}
}
const actionCreators = {navBarText,showBack,getChatList,reviceChatInfo};
@connect(mapStatetoProps,actionCreators)
class Boss_index extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
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
        const {showBack} = this.props;
        const {_id} = this.props.state.loginSatate
        showBack(false);
        asyncSaveSocket().then(data=>{
            console.log(data)
            // data.socket.removeAllListeners();
            this.props.getChatList(_id)
            this.props.reviceChatInfo(data.socket);//应该只调用一次
        }); 
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
        console.log(this.props)
        const {navBarText,showBack} = this.props.state;
        const {unread} = this.props.state.chat
        const navlist_ = navlist(this.props.state.loginSatate.type);
        //是否渲染底部和顶部
        const bottomUrl = ['/boss/job','/boss/employee','/boss/company','/boss/message','/boss/my'];
        const targetUrl = this.props.history.location.pathname;
        let showFooterOrtopBar = bottomUrl.find(url=> url === targetUrl)
        return (
            <div className ='flexBox'>
                {
                   showFooterOrtopBar && (
                        <header>
                            <SelfNavBar navBarText = {navBarText} showBack = {showBack}></SelfNavBar>
                        </header>
                    )
                }
                <div className = 'flex-container'> 
                    <BossRouter  navlist = {navlist_.concat(childRouter)}  type = {this.props.state.loginSatate.type}/>
                </div>
                {
                   showFooterOrtopBar && (
                        <div className = {bosscss.footer}>
                            <Footer navlist = {navlist_}  type = {this.props.state.loginSatate.type}
                                unread = {unread} setNavBarText = {(text)=>this.setNavBarText(text)}></Footer>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Boss_index