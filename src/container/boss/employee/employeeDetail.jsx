/*
 * @Descripttion: 牛人详情
 * @version: 
 * @Author: tll
 * @Date: 2019-08-10 15:39:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-14 14:55:52
 */
import React from 'react'
import {Card} from 'antd-mobile'
import {asyncGetWorkerInfo} from '@/redux/action'
import SelfNavBar from '@/components/selfNavBar'
import {getWorkTime} from '@/util'
class EmployeeDetail extends React.Component {
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
        return (
            <div>
                <SelfNavBar navBarText = {'牛人详情'} showBack = {true}></SelfNavBar>  
                <Card>
                    <Card.Header title={<h2>{job.hopeJob}</h2>}
                        extra={<span style={{color:'#108ee9'}}>{job.workmoney.join('-')}</span>}             
                    >
                    </Card.Header>
                    <Card.Footer 
                    content={
                        <p>
                            <i className='iconfont icondingwei'></i>&nbsp;
                            {
                                job.workcity.map((city,index)=><span key={index}>{city.label}{index !== job.workcity.length -1 && <span>·</span>}</span>)
                            }
                            &nbsp;&nbsp;
                            <i className='icongongzuojingyan iconfont'></i>&nbsp;
                            <span>{getWorkTime(info.workTime)}年</span>
                            <i className='iconedu-line iconfont'></i>
                            <span></span>
                        </p>}>
                    
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default EmployeeDetail