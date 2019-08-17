/*
 * @Descripttion: 发布职位页面
 * @version: 
 * @Author: tll
 * @Date: 2019-07-03 10:02:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-13 10:15:43
 */
import React from 'react'
import {connect} from 'react-redux'
import {asyncPostBossJob,asyncGetBossJob,asyncUpdateBossJob,asyncDeleteBossJob} from '@/redux/action'
import {List,Button,InputItem,WingBlank,WhiteSpace,Picker,Toast,Modal,TextareaItem,Icon,Checkbox} from 'antd-mobile'
import SelfNavBar from '@/components/selfNavBar'
import { createForm } from 'rc-form';
import { regionData} from 'element-china-area-data'
import Edu from '@/container/boss/job/filter-section'
import publishcss from './job-manage.scss'
import './job-manage.css'
import { CSSTransition } from 'react-transition-group';
import {getCityName,getEduName} from '@/util'
@connect(state=>({state:state.loginSatate}),{asyncPostBossJob,asyncGetBossJob,asyncUpdateBossJob,asyncDeleteBossJob})
class JobManage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            companyAddress:[],
            ifCompanyAddresChange:false,
            showFixWindow:false,
            saveJobInfo:{},
            showRight:true,
            jobList:[],
            addOrEdit:'添加',
            _id:'',//删除的job的_id数组
            showManage:false,//显示checkbox----删除job
            _ids:[],
        }
        this.setCompanyAddress = this.setCompanyAddress.bind(this)
        this.setShowFixWindow = this.setShowFixWindow.bind(this)
        this.setSaveJobInnfo = this.setSaveJobInnfo.bind(this)
        this.editJob = this.editJob.bind(this)
        this.updateSaveJobInfo = this.updateSaveJobInfo.bind(this)
    }
    //控制职位表单显示隐藏
    setShowFixWindow(v){
      this.setState({
        showFixWindow:v,
        addOrEdit:'保存',
      })
    }
    //公司地址
    setCompanyAddress(v){
        this.setState({
            companyAddress:v,
            ifCompanyAddresChange:true
        })
    }
    //是否填了信息退出有提示
   ifcloseFixWindow = ()=>{
    const {resetFields,isFieldTouched} = this.props.form;
    const {ifCompanyAddresChange} = this.state;
        let fieldsObject = ['job','edu','red','exp','jobDetail','skillAsk']
        let ifExitcontebt = [];
        fieldsObject.forEach(f=>{
            if(isFieldTouched(f)){
                ifExitcontebt.push(1)
            }
        })
       if(ifExitcontebt.length === 0 && !ifCompanyAddresChange){
            this.setShowFixWindow(false);
       }else{
            Modal.alert('', '内容尚未保存，确定放弃？', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => {
                    this.setState({
                        companyAddress:[],
                        showFixWindow:false,
                        ifCompanyAddresChange:false
                    })
                    resetFields()//清空表单内容
                    }   
                },
            ])
        }   
    }
    //获取boss创建的职位
    getBossCreatejobList = ()=>{
        const {username} = this.props.state;
        const asyncGetBossJob_ = this.props.asyncGetBossJob
        Toast.loading('loading...',0)
        asyncGetBossJob_(username).then(data=>{
            console.log(data);
            Toast.hide();
            this.setState({
                jobList:data.joblist
            })
        })  
    }
    //编辑职位
    editJob(info){
        const {setFieldsValue} = this.props.form;
        const {jobName,edu,red,workTime,address,jobDetail,skillAsk,_id} = info
        console.log(address.map(v=>v.value));
        this.setState({
            companyAddress:address.map(v=>v.value),
            showFixWindow:true,
            addOrEdit:'修改',
            ifCompanyAddresChange:false,
            _id,
        },()=>{
            setFieldsValue({
            job:jobName,
            edu:edu.map(v=>v.value),
            red,
            exp:workTime,
            jobDetail,
            skillAsk,
        });
        })
        console.log(info)
    }
    //职位管理---删除操作
    jobManage = ()=>{
        this.setState({
            showManage:!this.state.showManage,
            _ids:[]
        })
    }
    //点击删除 
    delBossAddJob = ()=>{
        console.log(this.state._ids);
        Modal.alert('删除操作', '是否删除选中职位？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                this.props.asyncDeleteBossJob(this.state._ids).then(data=>{
                    console.log(data);
                    this.getBossCreatejobList()
                })  
                }   
            },
        ]) 
    }
    checkboxChange = (e,id)=>{
        if(e.target.checked){
            this.state._ids.push(id)
            this.setState({
                _ids:this.state._ids
            })
        }else{
            this.setState({
                _ids:this.state._ids.filter(v=> v !== id)
            })
        }
    }
    //更新boss创建的职位
    updateSaveJobInfo(){
        const {isFieldTouched,getFieldValue} = this.props.form;
        const asyncUpdateBossJob_ = this.props.asyncUpdateBossJob;
        const {username} = this.props.state;
        const {_id,ifCompanyAddresChange,companyAddress,jobList} = this.state;
        let fieldsObject = {
                job:'jobName',
                edu:'edu',
                red:'red',
                exp:'workTime',
                jobDetail:'jobDetail',
                skillAsk:'skillAsk'
            }
         let postdata = {
            username,
            _id,
            data:{}
        }
        for(let f in fieldsObject){
            //被修改过了，要更新的数据
            if(isFieldTouched(f)){
                if(f === 'edu'){
                    postdata.data['edu']  =  getEduName(getFieldValue('edu'));
                }else{
                    postdata.data[fieldsObject[f]] = getFieldValue(f) 
                }    
            } 
        }
        if(ifCompanyAddresChange){
            postdata.data['address'] = getCityName(companyAddress)
        }
        console.log(postdata)
        if(Object.keys(postdata.data).length === 0 && !ifCompanyAddresChange){
            this.setState({
                showFixWindow:false 
            })
        }else{
            Toast.loading('修改中...', 0)
            asyncUpdateBossJob_(postdata).then(data=>{
                Toast.hide();
                console.log(data);
                jobList.forEach((job,index)=>{
                    if(job._id === data.newjoblist._id){
                        jobList.splice(index,1,data.newjoblist)
                    }
                })
                Toast.success('修改成功',.5,()=>{
                    this.setState({
                        showFixWindow:false,
                        jobList
                    })
                })
            }) 
        }   
    }
    componentDidMount(){
        //处理城市级联数据
        console.log(this.props);
        regionData.forEach(v=>{
            if(v.children && (v.children[0].label === '市辖区')){
                    v.children = v.children[0].children;
                }
            }); 
            //获取boss创建的职位
           this.getBossCreatejobList();
    }
    //保存信息
    setSaveJobInnfo(){
        const {getFieldValue,resetFields} = this.props.form;
        const {companyAddress} = this.state;
        console.log(this.props)
        const {username,name,myJob,company} = this.props.state;
        let tipInfo = {
                username:'用户错误',
                jobName:'职位',
                edu:'学历',
                red:'薪资',
                workTime:'工作时长',
                address:'公司地址'
        }
        let saveJobInfo  = {
                username,
                company,
                person:name,
                personDesc:myJob,
                jobName:getFieldValue('job'),
                edu:getEduName(getFieldValue('edu')),
                red:getFieldValue('red'),
                workTime:getFieldValue('exp'),
                address:getCityName(companyAddress),
                jobDetail:getFieldValue('jobDetail'),
                skillAsk:getFieldValue('skillAsk')
            } 
        //提交职位信息
        let ifNull = true;
        for(let o in saveJobInfo){
            if(!saveJobInfo[o]){
               Toast.fail(`请填写${tipInfo[o]}`,1)
               ifNull = false
               return;
            }
        }  
        if(ifNull){
            console.log(saveJobInfo);
            const asyncPostBossJob_ = this.props.asyncPostBossJob
            Modal.alert('', '是否添加当前职位？', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => {
                            asyncPostBossJob_(saveJobInfo).then(res=>{
                                console.log(res);
                                Toast.success('添加职位成功',1);
                                this.getBossCreatejobList();//获取创建的职位
                                this.setState({
                                    showFixWindow:false,
                                    companyAddress:[],
                                })
                                resetFields()//清除提交的职位数据
                        });
                    }   
                },
            ]) 
        }           
    }
    render(){
        const { getFieldProps} = this.props.form;
        const {showFixWindow,showRight,companyAddress,jobList,addOrEdit,showManage,_ids} = this.state;
       return (
        <div className='flexBox'>
            <SelfNavBar navBarText = '职位管理' showBack = {true} showSet = {true} jobManage = {this.jobManage}></SelfNavBar>
            <div className='flex-container'>
            <WingBlank>
                {
                    jobList.length  === 0 ?(
                        <p className={publishcss.noJob}>暂无职位</p>
                    ):(
                        showManage ? (
                            <List className={publishcss.joblist}>
                                {
                                    jobList.map((job,index)=>(
                                        <Checkbox.CheckboxItem key={job._id} 
                                     
                                        ref = {el=>this.checkboxRef = el}
                                        onChange={(e)=>this.checkboxChange(e,job._id)}
                                        >
                                            <b>{index+1}.</b>
                                            <span>{job.jobName}，</span>
                                            <span>{job.red.split(' ')}， </span>
                                            <span>{job.workTime}年经验</span>
                                        </Checkbox.CheckboxItem>
                                    ))  
                                }
                            </List>
                        ):(
                            <ul className={publishcss.joblist}>
                            {
                                jobList.map((job,index)=>(
                                    <li key={job._id} onClick={()=>this.editJob(job)}>
                                        <b>{index+1}.</b>
                                        <span>{job.jobName}，</span>
                                        <span>{job.red.split(' ')}， </span>
                                        <span>{job.workTime}年经验</span>
                                        <Icon type='right' />
                                    </li>
                                ))
                            }  
                        </ul>
                        )
                    )
                }
                </WingBlank>
                {
                    showManage && jobList.length  !== 0 ? (
                        <Button onClick = {this.delBossAddJob} 
                        disabled = {_ids.length ===0}
                            type='primary' style={{width:'80%',margin:'20px auto'}}>
                            删除
                        </Button>):(
                        <Button className={publishcss.addJob} onClick = {()=> this.setShowFixWindow(true)}>
                            <i className='iconfont iconjia'></i>
                        </Button> )
                }
                
                <CSSTransition in={showFixWindow} timeout={300} classNames='my-city' unmountOnExit>
                    <div className='fixWindow'>
                        <SelfNavBar navBarText = '基本职位信息' 
                        showBack = {false} 
                        showRight = {showRight}
                        setShowFixWindow = {this.ifcloseFixWindow}
                        ></SelfNavBar>
                        <WingBlank>
                            <List>
                                <InputItem
                                    {...getFieldProps('job')}
                                    placeholder="职位"
                                    >
                                    职位
                                </InputItem>  
                                <Picker data={Edu[0].list} cols={1} 
                                    {...getFieldProps('edu')}>
                                    <List.Item arrow="horizontal">学历</List.Item>
                                </Picker>
                                <InputItem
                                    {...getFieldProps('red')}
                                    placeholder='例如：10-12k'>
                                    薪资待遇
                                </InputItem>
                                <InputItem
                                    {...getFieldProps('exp')}
                                    placeholder="工作年限"
                                    extra='年'
                                    type='number'
                                    >
                                    工作经验
                                </InputItem> 
                                <Picker
                                    value = {companyAddress}
                                    extra={companyAddress.join(',')}
                                    onChange = {(v)=>this.setCompanyAddress(v)}
                                    data={regionData}>
                                    <List.Item arrow="horizontal" className='companyAdd'>公司地址</List.Item>
                                </Picker>
                                <TextareaItem
                                    title = '职位详情'
                                    {...getFieldProps('jobDetail')}
                                    placeholder='写下你对该职位的详情'
                                    rows={5}
                                    count={140}
                                />
                                <TextareaItem
                                    title = '技能要求'
                                    {...getFieldProps('skillAsk')}
                                    placeholder='写下你对该职位的技能要求'
                                    rows={2}
                                />
                            </List>
                            <div className='nullBox'></div>
                            <Button type='primary' 
                                className={publishcss.addJob} 
                                onClick = {addOrEdit === '保存' ? this.setSaveJobInnfo:this.updateSaveJobInfo}>
                               {addOrEdit}
                            </Button> 
                        <WhiteSpace />
                    </WingBlank>
                    </div>
                </CSSTransition>
            </div>
        </div>
     ) 
    }  
}
export default createForm()(JobManage)