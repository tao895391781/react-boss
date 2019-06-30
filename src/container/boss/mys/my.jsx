/*
 * @Descripttion: 我的--page
 * @version: 
 * @Author: tll
 * @Date: 2019-05-18 14:20:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-06-30 17:12:18
 */
import React from 'react'
import {Button,Modal,List,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {clearUserInfo,navBarText,asyncGetPersonSet} from '@/redux/action'
import mycss from './my.scss'
import headImg from '@/static/img/headImg.jpg'
import cookies from 'browser-cookies'
@connect(state=>({state:state.loginSatate}),{clearUserInfo,navBarText,asyncGetPersonSet})
class My extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navlink:[{
                text:'沟通过',
                value:37,
                link:''
            },{
                text:'待面试',
                value:12,
                link:''
            },{
                text:'已投简历',
                value:23,
                link:''
            },{
                text:'收藏',
                value:25,
                link:''
            }],
            name:''
        }
        this.exit = this.exit.bind(this)
        this.myInfo = this.myInfo.bind(this)
    }
    exit(){
        Modal.alert('退出操作', '你是否退出登录？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                console.log('退出登录');
                //初始化状态
                console.log(this.props)
                const {clearUserInfo,navBarText} = this.props;
                clearUserInfo();
                navBarText('职位')
                cookies.erase('userid')
                this.props.history.replace('/login');
            }   
        },
      ]) 
    }
    myInfo(){
        this.props.history.push({pathname:'/info',state:{from:'my'}})
    }
    componentDidMount(){
        //获取个人信息存在redux里面去
        console.log(this.props)
        const {name} = this.props.state;
        this.setState({
            name
        })
    }
    render() {
        const {navlink,name} = this.state;
        const {type,company} = this.props.state;
        return (
            <div className='pagebox'>
               <div className={mycss.header}>
                    <div>
                        <div>
                            <p>{name}</p>
                            {
                                type === 'worker' ? (<p>我的在线简历 ></p>):(<p>公司:{company}</p>)
                            }  
                        </div>
                        <div onClick={this.myInfo}>
                            <img src={headImg} alt=""/>
                        </div>
                    </div>
                    <ul>
                        {
                            navlink.map((li,index)=>(
                                <li key={index}>
                                    <p>{li.value}</p>
                                    <p>{li.text}</p>
                                </li>
                            ))
                        }
                    </ul>
               </div>
               <div className='nullBox'></div>
               <List>
                    <List.Item extra={<Icon type='right'></Icon>}>发布/管理职位</List.Item>
                </List>
                <Button type='warning' onClick= {this.exit} className={mycss.exit}>退出</Button>
            </div>
        )
    }
}

export default My