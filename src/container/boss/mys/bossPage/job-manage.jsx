/*
 * @Descripttion: 发布职位页面
 * @version: 
 * @Author: tll
 * @Date: 2019-07-03 10:02:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-06 18:29:30
 */
import React,{useState,useEffect} from 'react'
import {asyncPostBossJob} from '@/redux/action'
import {List,Button,InputItem,WingBlank,WhiteSpace,Picker,Toast,Modal,TextareaItem} from 'antd-mobile'
import SelfNavBar from '@/components/selfNavBar'
import { createForm } from 'rc-form';
import { regionData} from 'element-china-area-data'
import Edu from '@/container/boss/job/filter-section'
import publishcss from './job-manage.scss'
import './job-manage.css'
import { CSSTransition } from 'react-transition-group';
import {getCityName,getEduName} from '@/util'
import { spawn } from 'child_process';
function JobManage(props){
    const { getFieldProps,resetFields } = props.form;
    const [companyAddress,setCompanyAddress] = useState([]);//公司地址
    const [showFixWindow,setShowFixWindow] = useState(false)//控制职位表单显示隐藏
    const [jobNum,setJobNum] = useState(0);
    const [saveJobInfo,setSaveJobInnfo] = useState({});//保存职位信息
    const [showRight] = useState(true)//显示navbar右边内容
    const [ele,setEle] = useState({})//表单的各项Target
    const [eduText,setEduText] = useState('请选择')//初始化学历
    const ifcloseFixWindow = ()=>{
        Modal.alert('', '内容尚未保存，确定放弃？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                setShowFixWindow(false);
                resetFields()//清空表单内容
            }   
        },
      ]) 
    }
    useEffect(()=>{
        regionData.forEach(v=>{
            if(v.children && (v.children[0].label === '市辖区')){
                v.children = v.children[0].children;
            }
        });  
        console.log(saveJobInfo);
        let tipInfo = {
                jobName:'请填写职位',
                edu:'请填写学历',
                red:'请填写薪资',
                workTime:'请填写工作时长',
                address:'请填写公司地址'
        }
        //提交职位信息
        for(let o in saveJobInfo){
            if(!saveJobInfo[o]){
               Toast.fail(tipInfo[o],1)
               return;
            }else{
                console.log(saveJobInfo)
                asyncPostBossJob(saveJobInfo).then(res=>{
                    console.log(res);
                    Toast.success('添加职位成功',1)
                    setShowFixWindow(false)
                    setCompanyAddress([]);
                    resetFields()
                });
                return;
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[saveJobInfo])
    return (
        <div className='flexBox'>
            <SelfNavBar navBarText = '职位管理' showBack = {true}></SelfNavBar>
            <div className='flex-container'>
                {

                }
                <Button className={publishcss.addJob} onClick = {()=> setShowFixWindow(true)}>
                   <i className='iconfont iconjia'></i>
                </Button> 
                <CSSTransition in={showFixWindow} timeout={300} classNames='my-city' unmountOnExit>
                    <div className='fixWindow'>
                        <SelfNavBar navBarText = '基本职位信息' 
                        showBack = {false} 
                        showRight = {showRight}
                        setShowFixWindow = {ifcloseFixWindow}
                        ></SelfNavBar>
                        <WingBlank>
                            <List>
                                <InputItem
                                    {...getFieldProps('job')}
                                    placeholder="职位"
                                    ref={el=>ele.jobName = el}>
                                    职位
                                </InputItem>  
                                <Picker data={Edu[0].list} cols={1} 
                                    {...getFieldProps('edu')} 
                                    extra = {eduText}
                                    ref={el=>ele.edu = el}
                                    >
                                    <List.Item arrow="horizontal">学历</List.Item>
                                </Picker>
                                <InputItem
                                    {...getFieldProps('red')}
                                    placeholder='例如：10-12k'
                                    ref={el=>ele.red = el}
                                    >
                                    薪资待遇
                                </InputItem>
                                <InputItem
                                    {...getFieldProps('exp')}
                                    placeholder="工作年限"
                                    extra='年'
                                    type='number'
                                    ref={el=>ele.workTime = el}
                                    >
                                    工作经验
                                </InputItem> 
                                <Picker
                                    value = {companyAddress}
                                    extra={companyAddress.join(',')}
                                    onChange = {(v)=>setCompanyAddress(v)}
                                    data={regionData}>
                                    <List.Item arrow="horizontal" className='companyAdd'>公司地址</List.Item>
                                </Picker>
                                <TextareaItem
                                    title = '职位要求'
                                    {...getFieldProps('count')}
                                    placeholder='写下你对该职位的技能要求'
                                    rows={5}
                                    count={140}
                                />
                            </List>
                            <div className='nullBox'></div>
                            <Button type='primary' 
                            className={publishcss.addJob} 
                            onClick = {()=> setSaveJobInnfo({
                                    jobName:ele.jobName.props.value,
                                    edu:getEduName(ele.edu.props.value),
                                    red:ele.red.props.value,
                                    workTime:ele.workTime.props.value,
                                    address:getCityName(companyAddress)
                                })}>
                                保存
                            </Button> 
                        <WhiteSpace />
                    </WingBlank>
                    </div>
                </CSSTransition>
            </div>
        </div>
    )
}

export default createForm()(JobManage)