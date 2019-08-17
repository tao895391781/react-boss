/*
 * @Descripttion: 我的在线简历
 * @version: 
 * @Author: tll
 * @Date: 2019-07-14 10:27:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-14 15:29:17
 */
import React from 'react'
import {NavBar,Icon,Card,WingBlank,WhiteSpace,List,Button} from 'antd-mobile'
import HeightComponentMixFun from '@/components/height-components/mixFunction'
import { connect } from 'react-redux';
import {getWorkTime,getOld} from '@/util'
import headImg from '@/static/img/headImg.jpg'
import onlineCV from './onlineCV.scss'
import PickerSelect from '@/components/my-info/pickerSelect'
import {asyncAddHopeJob,asyncGetonlinecv} from '@/redux/action'
import InitScroll from '@/selfScroll'
@connect(state=>({state:{loginSatate:state.loginSatate,onlinecv:state.onlinecv}}),{asyncAddHopeJob,asyncGetonlinecv})
class OnlineCV extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:11,
            jobStatus:[{
                label:'离职-随时到岗',
                value:'离职-随时到岗'
            },{
                label:'在职-月内到岗',
                value:'在职-月内到岗'
            },{
                label:'在职-考虑机会',
                value:'在职-考虑机会'
            },{
                label:'在职-暂不考虑',
                value:'在职-暂不考虑'
            }],
            selectvalue:[],
            hopeJoblist:[],
        }
    }
    componentDidUpdate(){
        console.log(111)
        InitScroll(this.wrapper).refresh()
    }
    componentDidMount(){
        const {username} = this.props.state.loginSatate
        this.props.asyncGetonlinecv(username).then(data=>{
            console.log(data);
            this.setState({
                selectvalue:data.jobStatus ? [data.jobStatus]:["离职-随时到岗"],
                hopeJoblist:data.jobHope
            })
        });
        //初始化iscoll 
        console.log(InitScroll(this.wrapper))
        InitScroll(this.wrapper)
    }
    goInfo = ()=>{
        this.props.history.push({pathname:'/info',state:{from:'onlineCV'}})
    }
    selectOption = (v,label)=>{
        console.log(v);
        this.setState({
            [label]:v
        });
        const {username} = this.props.state.loginSatate
        let postdata = {
            username,
            type:'jobStatus',
            data:v.join('')
        }
        this.props.asyncAddHopeJob(postdata).then(data=>{
            console.log(data)
        })
    }
    //修改求职期望
    revisejobHope = (job)=>{
        
        this.props.history.push({pathname:'/addJobHope',state:{job,length:this.state.hopeJoblist.length}})
    }
    render() {
        console.log(this.props)
        const {name,workTime,birth,myAdvantage} = this.props.state.loginSatate
        const {jobStatus,selectvalue,hopeJoblist} = this.state
        const newProps = {
            data:{
                data:jobStatus,
                value:selectvalue
            }
        }
        return (
            <div className='pagebox'>
                <NavBar icon={<Icon type='left' {...this.props.fun} />}>我的简历</NavBar>
                <div ref={ref=>this.wrapper = ref} className='scrollBox'>
                <WingBlank>
                    <WhiteSpace />
                    <Card onClick={this.goInfo}>
                        <Card.Header title={
                            <div>
                                <span style={{fontSize:'.2rem'}}>{name}&nbsp;</span><i className='iconfont iconxiugai' />
                                <br />
                                <div className={onlineCV.textStyle}>
                                    {
                                        workTime && <span>{getWorkTime(workTime)}年经验</span>
                                    }
                                    {
                                        birth && <><span>·</span><span>{getOld(birth)}岁</span></>  
                                    }
                                    {/* <span>·</span> */}
                                </div>
                            </div>}
                                extra = {<img src={headImg} className={onlineCV.img} alt='loading' />}
                            >
                        </Card.Header>
                        <Card.Footer 
                            content={myAdvantage && <p className={onlineCV.infoFooter}>{myAdvantage}</p>}>
                        </Card.Footer>
                    </Card>
                    <WhiteSpace />
                    <PickerSelect {...newProps} text='求职状态' 
                        selectOption = {(v)=>this.selectOption(v,'selectvalue')}/>
                    <List renderHeader={()=>(
                        <>
                            <span className={onlineCV.titleStyle}>求职期望 
                            </span>
                            <i className={'iconjia1 iconfont ' + onlineCV.btn} onClick = {()=>this.props.goPage('/addJobHope')}></i>
                        </>)}> 
                        {
                            hopeJoblist.length === 0 ? (<p className={onlineCV.noDataStyle}>暂无求职期望</p>):
                            (hopeJoblist.map(job=>(
                                <List.Item key={job._id} arrow='horizontal' onClick={()=>this.revisejobHope(job)}>
                                    {job.hopeJob} {job.workmoney.join('-')}
                                    <List.Item.Brief>{job.hopeTrade} {job.workcity[1].label}</List.Item.Brief>
                                </List.Item>
                            )))
                        }
                    </List> 
                    <List renderHeader={()=>(
                        <>
                            <span className={onlineCV.titleStyle}>教育经历
                            </span>
                            <i className={'iconjia1 iconfont ' + onlineCV.btn} onClick = {()=>this.props.goPage('/addEduExp')}></i>
                        </>)}>
                    </List>
                    <div className='scrollBottom'></div>
                </WingBlank>
                </div>
            </div>
        )
    }
}

export default HeightComponentMixFun(OnlineCV)