/*
 * @Descripttion: 添加教育经历
 * @version: 
 * @Author: tll
 * @Date: 2019-08-14 15:04:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-15 15:08:48
 */
import React from 'react'
import {NavBar,Icon,List,Picker,Toast,Modal} from 'antd-mobile'
import {eduList,time} from '@/data'
import {connect} from 'react-redux'
import {asyncAddHopeJob} from '@/redux/action'
import {createForm} from 'rc-form'
import InputText from '@/components/height-components/inputText'
import jobHopecss from './addJobHope.scss'
@connect(state=>({state:state.loginSatate}),{})
class AddEduExp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }  
    }
    componentDidMount(){
        console.log(this.props)
    }
    //postdata
    postdata = ()=>{
        const {getFieldValue} = this.props.form
        return {
            ...this.props.data,
            edu:getFieldValue('edu'),
            time:getFieldValue('time').join('-')
        }
    }
     //保存修改的数据
    save = ()=>{
        console.log(this.postdata());
        let data =  this.postdata();
        let tips = {
            school:'请填写学校',
            edu:'请填写学历',
            major:'请填写专业',
            time:'请填写在校时间段',
            schoolExp:'请填写在校经历'
        }
        for(let o in data){
            if(!data[o]){
                Toast.fail(`${tips[o]}`,1);
                return;
            }
        }
        //都填写了进行提交操作
        const {username} = this.props.state;
        let submitData =  {
                username,
                type:'eduExp',
                data:this.postdata(),
                ifEdit:{type:'add'}
        };
        asyncAddHopeJob(submitData).then(data=>{
            console.log(data);
        }) 
    }
    //提出
    exit = ()=>{
        console.log(this.postdata());
        let data =  this.postdata()
        for(let o in data){
            if(data[o]){
                Modal.alert('退出', '你有内容没保存，是否退出？', [
                    { text: '取消', onPress: () => {}},
                    { text: '确定', onPress: () => this.props.goback()},
                  ]);
                  break;
            }else{
                this.props.goback();
                return;
            }
        }
    }
    //时间段的格式化
    timeFormat = (label)=>{
        return label.join('-') 
    }
    render(){
        console.log(this.props)
        const {getFieldProps} = this.props.form
        const eduExp = this.props.data
        return (
            <div>
                <NavBar icon={<Icon type='left'></Icon>} 
                    onLeftClick = {this.exit}
                    rightContent={<span style={{fontSize:'18px'}} onClick={this.save}>保存</span>}>
                    教育经历
                </NavBar>   
                <List>
                    <List.Item arrow='horizontal' onClick={()=>{this.props.exitWxorName(true,{type:'texteara',text:'学校',label:'school',value:eduExp.school,rows:2,count:35})}}>
                        <span className={jobHopecss.deepTitle}>学校</span>
                        <List.Item.Brief>
                            {
                                eduExp.school ? (<span className={jobHopecss.mainText}>{ eduExp.school}</span>):
                                (<span className={jobHopecss.placeHolder}>请输入</span>)  
                            }
                           </List.Item.Brief>
                    </List.Item>  
                    <Picker
                        title='学历'
                        cols={1}
                        okText = {<Icon type='check'/>}
                        dismissText = {<Icon type='cross'/>}
                        data={eduList}
                        {...getFieldProps('edu')}
                    >
                        <List.Item arrow="horizontal">
                            <span className={jobHopecss.deepTitle}>学历</span>
                        </List.Item>
                    </Picker>
                    <List.Item arrow='horizontal' onClick={()=>{this.props.exitWxorName(true,{type:'texteara',text:'专业',label:'major',value:eduExp.major,count:20,rows:2})}}>
                        <span className={jobHopecss.deepTitle}>专业</span>
                        <List.Item.Brief>
                            {
                                eduExp.major ? (<span className={jobHopecss.mainText}>{eduExp.major}</span>):
                                (<span className={jobHopecss.placeHolder}>请输入</span>)  
                            }
                           </List.Item.Brief>
                    </List.Item>  
                    <Picker
                        title='时间段'
                        cols={2}
                        format = {(label)=>this.timeFormat(label)}
                        okText = {<Icon type='check'/>}
                        dismissText = {<Icon type='cross'/>}
                        data={time}
                        {...getFieldProps('time')}
                    >
                        <List.Item arrow="horizontal">
                            <span className={jobHopecss.deepTitle}>时间段</span>
                        </List.Item>
                    </Picker>
                    <List.Item arrow='horizontal' onClick={()=>{this.props.exitWxorName(true,{type:'texteara',text:'在校经历',label:'schoolExp',value:eduExp.schoolExp,count:300,rows:3})}}>
                        <span className={jobHopecss.deepTitle}>在校经历</span>
                        <List.Item.Brief>
                            {
                                eduExp.schoolExp ? (<span className={jobHopecss.mainText}>{eduExp.schoolExp}</span>):
                                (<span className={jobHopecss.placeHolder}>选填 请输入</span>)  
                            }
                           </List.Item.Brief>
                    </List.Item> 
                </List>
            </div>
        )
    }
}
const eduExp = {
    school:'',
    edu:'',
    major:'',
    time:'',
    schoolExp:''
}
export default (InputText(createForm()(AddEduExp),eduExp))