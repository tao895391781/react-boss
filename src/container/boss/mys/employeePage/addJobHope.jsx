/*
 * @Descripttion: 添加工作期望
 * @version: 1.0.0
 * @Author: tll
 * @Date: 2019-07-20 17:37:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-15 14:38:16
 */
import React from 'react'
import {NavBar,Icon,List,Picker,Button,Toast,Modal} from 'antd-mobile'
import { createForm } from 'rc-form';
import {connect} from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import HopeJobAndTrade from '@/components/my-info/wxName'
import HeightFun from '@/components/height-components/mixFunction'
import {regionData} from 'element-china-area-data'
import {asyncAddHopeJob} from '@/redux/action'
import jobHopecss from './addJobHope.scss'
import {getCityName,delcityText} from '@/util.js'
@connect(state=>({state:state.loginSatate}),{})
class AddJobHope extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // 提交数据
            hopeJob:{
                label:'hopeJob',
                value:'11'
            },
            hopeJob_:'',
            hopeTrade_:'',
            hopeTrade:{
                label:'hopeTrade',
                value:'不限'
            },
            workcity:'',
            workmoney:'',
            // 
            showHopeJob:false,
            showHopeTrade:false,
            hopeType:'',
            jobPayData:[]
        }
    }
    componentWillMount(){
        //初始化薪资数据
        let jobPayData = [{value:'面议',label:'面议'}];
        for(let i = 1;i < 60;i++){
            if(i <= 30){
              jobPayData.push({
                    label:i + 'k',
                    value:i + 'k',
                    children:[]
                })
            }
            if(i > 30 && i <= 44){
                jobPayData.push({
                    label:30+(i-30)*5 + 'k',
                    value:30+(i-30)*5 + 'k',
                    children:[]
                })
            }
            if(i > 44 && i <= 59){
                jobPayData.push({
                    label:100+(i-44)*10 + 'k',
                    value:100+(i-44)*10 + 'k',
                    children:[]
                })
            }
        }
        let jobPayData_ = [{value:'面议',label:'面议'}]
        jobPayData.forEach((v,index)=>{
            if(index!==0){
                jobPayData_.push({
                    label:v.label,
                    value:v.value,
                    children: jobPayData.slice(index+1,index+6)
                })
            }   
        })
        this.setState({jobPayData:jobPayData_})
    }
    componentDidMount(){
        console.log(this.props)
        if(this.props.location.state){
            this.setState({
                hopeJob:{...this.state.hopeJob,value:this.props.location.state.job.hopeJob},
                hopeTrade:{...this.state.hopeTrade,value:this.props.location.state.job.hopeTrade},
            });
        const {setFieldsValue} = this.props.form;
        setFieldsValue({
            workCity:this.props.location.state.job.workcity.map(v=> v.value),
            workMoney:this.props.location.state.job.workmoney
            })
        }
        let filterCity = '北京市天津市重庆市上海市';
        regionData.forEach(v=>{
            if(filterCity.indexOf(v.label) ===-1){
                    v.children &&  v.children.forEach(v1=>{
                        if(v1.children){
                            v1.children = [];
                        }
                        v1.label = delcityText(v1.label)
                    })
                    v.label = delcityText(v.label);

            }else{
                v.label = delcityText(v.label);
                v.children = [{
                    value:v.value,
                    label:delcityText(v.label)
                }]
            }
        });
        console.log(regionData)
    }
    formatLabel = (label)=>{
        if(typeof(label) === 'string'){
            if(label.join(',').length > 1){
                return label.join(',')[label.join(',').length -1];
            }else{
                return label.join(',')[0]
            }   
        }else{
            if(label.length > 1){
                return label[label.length-1]
            }else{
                return label[0]
            }
            
        }
    }
    formatRed  = (label)=>{
        if(!label) return
        return label.join(',').split(',').join('-')
    }
    //关于数据的一些操作
    //退出修改
    exitWxorName = (show,flag,type)=>{
        console.log(this.state)
            if(flag){
                this.setState({
                    [show]:flag,
                    hopeType:type,

                })  
            }else{
                this.setState({
                [show]:false
            }) 
        }   
    }
    //确定修改
    sureWxorName = (val)=>{
        console.log(val);
        if(!val){
            Toast.fail('请输入',1)
            return;
        }
        const {hopeType} = this.state
        const HopeJobAndTrade = hopeType === 'job' ? 'hopeJob':'hopeTrade';
        this.setState({
            [HopeJobAndTrade]:{...this.state[HopeJobAndTrade],value:val},
            showHopeJob:false
        })
    }
    //删除工作期望
    delJobHope = ()=>{
        const {username} = this.props.state;
        let postdata = {
            username,
            type:'jobHope',
            data:{},
            ifEdit:{
                    type:'delete',
                    _id:this.props.location.state.job._id
            }
        };
        Modal.alert('删除操作', '您确定删除该职业吗?', [
            { text: '取消', onPress: () => {}},
            { text: '确定', 
            onPress:()=>{asyncAddHopeJob(postdata).then(data=>{
                console.log(data);
                this.props.history.go(-1);
            })}},
        ])
    }
    //保存
    saveHopeJob = ()=>{
        const {username} = this.props.state;
        const {getFieldValue,isFieldTouched} = this.props.form;
        let postdata = {
                username,
                type:'jobHope',
                data:{},
                ifEdit:{}
            }; 
        if(this.props.location.state){
            const {job} = this.props.location.state;
            const {hopeJob,hopeTrade} = this.state;
           
            //检查是否修改了数据
            if(job.hopeJob !== hopeJob.value){
                postdata.data = Object.assign(postdata.data,{hopeJob:this.state.hopeJob.value})
            }
            if(job.hopeTrade !==  hopeTrade.value){
                postdata.data = Object.assign(postdata.data,{hopeTrade:this.state.hopeTrade.value})
            }
            if(isFieldTouched('workCity')){
                postdata.data  = Object.assign(postdata.data,{workcity:getCityName(getFieldValue('workCity'))})
            }
            if(isFieldTouched('workMoney')){
                postdata.data  = Object.assign(postdata.data,{workmoney: getFieldValue('workMoney')})
            }
            postdata.ifEdit = {
                    type:'update',
                    _id:this.props.location.state.job._id
                };
        }else{
            postdata.ifEdit ={type:'add'};
            postdata.data = {
                    hopeJob:this.state.hopeJob.value,
                    hopeTrade:this.state.hopeTrade.value, 
                    workcity:getCityName(getFieldValue('workCity')),
                    workmoney:getFieldValue('workMoney') 
                };
        }
        let tips = {
            hopeJob:'期望职位',
            hopeTrade:'期望行业',
            workmoney:'薪资要求',
            workcity:'工作地点'
        }
        for(let o in postdata.data){
            if(!postdata.data[o]){
                Toast.fail(`请填写${tips[o]}`,1);
                return
            }
        }
        console.log(postdata)
        if(Object.keys(postdata.data).length === 0){
                this.props.history.go(-1); 
        }else{
                asyncAddHopeJob(postdata).then(data=>{
                console.log(data);
                this.props.history.go(-1);
            }) 
        }
        
    }
    render() {
        const {getFieldProps} = this.props.form
        const {hopeJob,hopeTrade,showHopeJob,hopeType} = this.state;
        const hopeJobOrhopeTrade = hopeType === 'job' ? hopeJob:hopeTrade;
        const ifEdit = this.props.location.state && this.props.location.state.job ? '编辑':'添加';
        const length = this.props.location.state && this.props.location.state.length;
        return (
            <div className='flexBox'>
            <CSSTransition in={showHopeJob} timeout={300} classNames='my-provice' unmountOnExit>
                   <div className='fixWindow'>
                        <HopeJobAndTrade 
                        value={hopeJobOrhopeTrade} 
                        sureWxorName = {this.sureWxorName}
                        resivePersonInfo  ={()=>{}}
                        exitWxorName = {()=>this.exitWxorName('showHopeJob')}
                       ></HopeJobAndTrade>
                    </div> 
                </CSSTransition>
                <NavBar icon={<Icon type='left' {...this.props.fun} />}></NavBar>  
                <List className='flex-container' renderHeader = {
                    <div className={jobHopecss.listHeader}>
                        <h3>{ifEdit}求职期望</h3>
                        <p>求职期望的不同，推荐的职位也会不同</p>
                    </div>}>
                    <List.Item arrow='horizontal' onClick={()=>{this.exitWxorName('showHopeJob',true,'job')}}>
                        <span className={jobHopecss.tintTitle}>期望职位</span>
                        <List.Item.Brief>
                            {
                                hopeJob.value ? (<span className={jobHopecss.mainText}>{hopeJob.value}</span>):
                                (<span className={jobHopecss.placeHolder}>请选择期望职位</span>)  
                            }
                           </List.Item.Brief>
                    </List.Item>
                    <List.Item arrow='horizontal' onClick={()=>{this.exitWxorName('showHopeJob',true,'trade')}}>
                        <span className={jobHopecss.tintTitle}>期望行业</span>
                        <List.Item.Brief>
                            <span className={jobHopecss.mainText}>{hopeTrade.value}</span>
                        </List.Item.Brief>
                    </List.Item>
                    <Picker
                        title='工作城市'
                        okText = {<Icon type='check'/>}
                        dismissText = {<Icon type='cross'/>}
                        data={regionData}
                        format = {(label)=>this.formatLabel(label)}
                        {...getFieldProps('workCity')}
                    >
                        <List.Item arrow="horizontal">
                            <span className={jobHopecss.tintTitle}>工作城市</span>
                        </List.Item>
                    </Picker>
                    <Picker
                        okText = {<Icon type='check'/>}
                        dismissText = {<Icon type='cross'/>}
                        title='薪资要求(月薪，单位:千元)'
                        data={this.state.jobPayData}
                        format = {(label)=>this.formatRed(label)}
                        {...getFieldProps('workMoney')}
                    >
                        <List.Item arrow="horizontal">
                            <span className={jobHopecss.tintTitle}>薪资要求</span>
                        </List.Item>
                    </Picker>
                </List>
                <div className={jobHopecss.btnDiv}>
                    {
                       (length !== 1 &&  ifEdit !=='添加') && 
                       (<Button className={jobHopecss.delBtn} onClick={this.delJobHope}>删除本条</Button>)
                    }
                    <Button type='primary' 
                    className={length === 1 || ifEdit ==='添加'? 'saveBtn':jobHopecss.saveBtn} 
                    onClick={this.saveHopeJob}>完成</Button>
                </div>
                
            </div>
        )
    }
}
export default createForm()(HeightFun(AddJobHope))