/*
 * @Descripttion: 添加教育经历
 * @version: 
 * @Author: tll
 * @Date: 2019-08-14 15:04:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-25 16:52:23
 */
import React from 'react'
import {NavBar,Icon,List,Picker,Toast,Modal,Button} from 'antd-mobile'
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
        this.ifEdit = 0;//是否是编辑
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps,this.props)
        if(JSON.stringify(nextProps.data) !==JSON.stringify(this.props.data)){
            console.log('编辑状态');
            if(this.props.type.type === 'update'){
                const {setFieldsValue} = this.props.form;
                const {edu,time} = nextProps.data
                setFieldsValue({
                    edu,
                    time:time && time.join('-').split('-')
                })  
            }
            //检查表单数据是否修改
            this.ifEdit++
        }
    }
    //检查picker组件的值是否由用户改变了
    checkPickerChange = ()=>{
        const {isFieldsTouched} = this.props.form;
        const formValueChange =  isFieldsTouched(['edu','time']);
        return formValueChange;
    }
    postdata = ()=>{
        const {getFieldValue} = this.props.form
        return {
            ...this.props.data,
            edu:getFieldValue('edu'),
            time:getFieldValue('time') && getFieldValue('time').join('-')
        }
    }
     //保存修改的数据
    save = ()=>{
        console.log(this.postdata());
        console.log(this.props.type)
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
                Toast.fail(tips[o],1);
                return;
            }
        }
        //都填写了进行提交操作
        const {username} = this.props.state;
        let submitData =  {
                username,
                type:'eduExp',
                data:this.postdata(),
                ifEdit:this.props.type
        };
        if((this.ifEdit > 0 && this.props.type.type === 'add') || (this.ifEdit > 1 && this.props.type.type!=='add')
         || (this.props.type.type!=='add' && this.checkPickerChange())){
            asyncAddHopeJob(submitData).then(data=>{
                console.log(data);
                if(data.code === 1){
                    this.props.goback() 
                }
            }) 
        }else{
          this.props.goback()     
        }  
    }
    //退出
    exit = ()=>{
        let data =  this.postdata();
        if((this.ifEdit > 1 || this.props.type.type === 'add')||(this.props.type.type!=='add' && this.checkPickerChange())){
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
        }else{
            this.props.goback()
        }
    }
    //删除本条
    delEduExp = ()=>{
        Modal.alert('删除', '您是否删除本次教育经历？', [
                        { text: '取消', onPress: () => {}},
                        { text: '确定', onPress: () => {
                            const {username} = this.props.state;
                            let submitData =  {
                                    username,
                                    type:'eduExp',
                                    data:this.postdata(),
                                    ifEdit:{...this.props.type,type:'delete'}
                            };
                            console.log(submitData,111111111111111)
                            asyncAddHopeJob(submitData).then(data=>{
                                console.log(data);
                                if(data.code === 1){
                                    this.props.goback() 
                                }
                            }) 
                        }},
                    ]); 
    }
    //时间段的格式化
    timeFormat = (label)=>{
        return label.join('-') 
    }
    render(){
        const {getFieldProps} = this.props.form;
        const eduExp = this.props.data
        console.log(this.props)
        const {length} = this.props.location.state || false;
        console.log(eduExp)
        return (
            <div className='flexBox'>
                <NavBar icon={<Icon type='left'></Icon>} 
                    onLeftClick = {this.exit}
                >
                    教育经历
                </NavBar>   
                <List className='flex-container'>
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
                {
                       <div className={jobHopecss.btnDiv}>
                            {
                            (length !== 1 && length) && 
                            (<Button className={jobHopecss.delBtn} onClick={this.delEduExp}>删除本条</Button>)
                            }
                            <Button type='primary' 
                            className={(length === 1 || !length) ? 'saveBtn':jobHopecss.saveBtn} 
                            onClick={this.save}>完成</Button>
                         </div> 
                }
                
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