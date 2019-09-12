/*
 * @Descripttion: 牛人详情
 * @version: 
 * @Author: tll
 * @Date: 2019-08-10 15:39:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-04 16:31:22
 */
import React from 'react'
import {Card,WhiteSpace,List,WingBlank,Button} from 'antd-mobile'
import {asyncGetWorkerInfo} from '@/redux/action'
import SelfNavBar from '@/components/selfNavBar'
import {getWorkTime} from '@/util'
import employeeDetailCSS from '@/container/boss/employee/employeeDetail.scss'
import imgSrc from '@/static/img/headImg.jpg'
class JobDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            info:{}
        }
    }
    componentDidMount(){
        console.log(this.props.location.state)
        const {username} = this.props.location.state;
        asyncGetWorkerInfo(username).then(data=>{
            console.log(data)
            this.setState({
                info:data.data
            })
        })
    }
    render() {
        const {info} = this.state
        const job = this.props.location.state
        const {_id} = this.props.location.state
        console.log(this.props.location.state)
        job.address.forEach((v,index,arr)=>{
            if(v.label === '北京' || v.label === '天津'|| v.label === '上海'|| v.label === '重庆' ){
                arr.splice(1,1)
            }
        })
        return (
            <div className='flexBox'>
                <SelfNavBar navBarText ='职位详情' showBack = {true}></SelfNavBar>  
                <div className='flex-container'>
                    <WhiteSpace />
                        <Card className={employeeDetailCSS['card-border']}>
                            <Card.Header title={<h3>{job.jobName}</h3>}
                                extra={<span style={{color:'#108ee9',fontSize:'20px'}}>{job.red}</span>}>
                            </Card.Header>
                            <Card.Footer 
                            content={
                                <p>
                                    <i className='iconfont icondingwei'></i>&nbsp;
                                    {
                                        job.address.map((city,index)=><span key={index}>{city.label}{index !== job.address.length -1 && <span>·</span>}</span>)
                                    }
                                    &nbsp;&nbsp;
                                    <i className='icongongzuojingyan iconfont'></i>
                                    <span>{job.workTime}年</span>
                                    &nbsp;&nbsp;
                                    <i className='iconedu-line iconfont'></i>
                                    <span>{job.edu[0].label}</span>
                                </p>}>
                            </Card.Footer>
                        </Card>
                        <List>
                            <List.Item 
                            style={{padding:'15px'}}
                            thumb={<img src={imgSrc} alt='头像' className={employeeDetailCSS['list-img']} />} arrow='horizontal'>
                                {info.name}
                            </List.Item>
                        </List>
                        <WingBlank>
                            <WhiteSpace />
                                <h4>职位详情</h4>
                            <WhiteSpace />
                            <p className={employeeDetailCSS['advantage']}>
                                {job.skillAsk}
                            </p>
                        </WingBlank>
                    </div>
                    <WingBlank>
                        <Button type='primary' onClick={()=>{this.props.history.push({pathname:`/chat/${info.username}`,state:{name:info.name}})}}>立即沟通</Button>
                    </WingBlank>
                    <WhiteSpace />
            </div>
        )
    }
}
export default JobDetail