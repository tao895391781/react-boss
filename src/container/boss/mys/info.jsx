import React from 'react'
import {NavBar,Icon,Modal,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import WxName from '@/components/my-info/wxName'
import Sex from '@/components/my-info/sex'
import Advantage from '@/components/my-info/advantage'
import infocss from './info.scss'
import { CSSTransition } from 'react-transition-group';
import {getcompanyByName} from '@/api'
import axios from 'axios'
import {asyncSavePersonSet} from '@/redux/action'
const alert = Modal.alert;
@connect(state=>({state:state.loginSatate}),{asyncSavePersonSet})
class Info extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            bossInfo:{
                headImg:'',
                name:'',
                company:'',
                myJob:'',
                myEmail:''
            },
            workInfo:{
                headImg:'',
                name:'',
                sex:'',
                workTime:'',
                wxNum:'',
                birth:'',
                myAdvantage:''
            },
            showWxName:false,
            showmyAdvantage:false,
            sexSelect:[{
                label:'男',
                value:'男'
            },{
                label:'女',
                value:'女'
            }], 
            wxNum_:'',
            myAdvantage_:'',
            type:'',
            searchCompany:[],

        }
        this.back = this.back.bind(this)
        this.reviseWXname = this.reviseWXname.bind(this)
        this.exitWxorName = this.exitWxorName.bind(this)
        this.sureWxorName = this.sureWxorName.bind(this)
        this.resivePersonInfo = this.resivePersonInfo.bind(this)
        this.selectSex = this.selectSex.bind(this)
        this.showMyAd = this.showMyAd.bind(this)
        this.advSure = this.advSure.bind(this)
        this.advBlur = this.advBlur.bind(this)
        this.companySearch = this.companySearch.bind(this)
    }
    companySearch(name){
        if(!name.trim()){
            this.setState({searchCompany:[]}); 
        }else{
            axios.get(getcompanyByName+`?name=${name}`).then(res=>{
                this.setState({searchCompany:res.data.companys});  
            })
        }  
    }
    //返回首页或者我的页面
    back(){
        let {from} = this.props.history.location.state;
        let {name} = this.props.state;
        if(from === 'login'){
            if(!name){
                alert('友情提示', '您还没填写姓名，是否退出回到登录？', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确定', onPress: () => {
                        this.props.history.replace('/login'); 
                    }   
                },
              ])   
            }else{
                this.props.history.replace('/boss');   
            }
        }else{
            this.props.history.replace('/boss/my');   
        }  
    }
    //修改信息
    reviseWXname(label){
        const {type} = this.props.history.location.state
        const {workInfo,bossInfo} = this.state;
        let info = type === 'worker' ? workInfo:bossInfo;
        this.setState({
            showWxName:true,
            wxNum_:{
                label,
                value:info[label]
            }
        })
    }
    //退出微信号或姓名修改
    exitWxorName(key){
        const {myAdvantage_,wxNum_,workInfo,bossInfo,type} = this.state;
        if(key === 'showmyAdvantage'){
            if(this.state.workInfo['myAdvantage'] === myAdvantage_){
                this.setState({
                    [key]:false
                }) 
            }else{
                alert('友情提示', '离高薪职位只差一步，你确定放弃？', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确定', onPress: () => {
                        this.setState({
                            [key]:false
                        }) 
                    }   
                },
              ]) 
            }  
        }else{
            console.log(wxNum_);
            let info = type === 'worker'?workInfo:bossInfo
            if(wxNum_.value === info[wxNum_.label]){
                this.setState({
                    [key]:false
                }) 
            }else{
                alert('', '内容尚未保存，确定放弃？', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    { text: '确定', onPress: () => {
                        this.setState({
                            [key]:false
                        }) 
                    }   
                },
              ])  
            }    
        }
    }
    //确定微信号或姓名修改
    sureWxorName(){
        let {workInfo,wxNum_,bossInfo,type} = this.state;
        let info = type === 'worker'?workInfo:bossInfo
        let info_ = type === 'worker'?'workInfo':'bossInfo'
        let {value,label} = wxNum_;
        let {name} = info;
        if(label === 'name' && !value){
            Toast.fail('名字不能为空', 1);
            return;
        }
        if(wxNum_.value !== name){
            const {username,type} = this.props.state;
            let postdata = {
                data:{
                    [label]:value
                },
                username,
                type
            }
            console.log(postdata)
            const asyncSavePersonSet_ = this.props.asyncSavePersonSet 
            asyncSavePersonSet_(postdata).then(data=>{
                console.log(data)
                if(data.code === 1){
                        let workInfo_ = Object.assign({},{...info},{[label]:value})
                        console.log(workInfo_)
                        this.setState({
                            [info_]:workInfo_,
                            showWxName:false
                        }) 
                    Toast.success('修改成功', 1); 
                } 
            });
        }else{
            this.setState({
                showWxName:false
            })
        }
    }
    //动态修改信息
    resivePersonInfo(value){
        this.setState({
            wxNum_:{...this.state.wxNum_,value}
        })
    }
    // 选择性别---提交数据
    selectSex(key,val){
        console.log(key,val);
        const {username,type} = this.props.state;
        let postdata = {
            data:{
                [key]:val[0]
            },
            username,
            type
        }
        const asyncSavePersonSet_ = this.props.asyncSavePersonSet 
        asyncSavePersonSet_(postdata).then(data=>{
            console.log(data)
            if(data.code === 1){
                this.setState({
                    workInfo:Object.assign({},{...this.state.workInfo},{[key]:val})
                })
                Toast.success('修改成功', 1); 
            }   
        });
    }
    //显示我的优势
    showMyAd(){
        this.setState({
            showmyAdvantage:true,
            myAdvantage_:this.state.workInfo['myAdvantage']
        })
    }
    advBlur(val){
        this.setState({
            myAdvantage_:val
        })
    }
    //提交我的优势  文本
    advSure(){
        const {myAdvantage_,myAdvantage} = this.state; 
        if(myAdvantage_ !== myAdvantage){
            const {username,type} = this.props.state;
            let postdata = {
                data:{
                    myAdvantage:myAdvantage_
                },
                username,
                type
            } 
            const asyncSavePersonSet_ = this.props.asyncSavePersonSet
            asyncSavePersonSet_(postdata).then(data=>{
                if(data.code === 1){
                    this.setState({
                        showmyAdvantage:false,
                        workInfo:Object.assign({},{...this.state.workInfo},{myAdvantage:myAdvantage_})
                    })
                    Toast.success('修改成功', 1); 
                }
            })  
        }else{
            this.setState({
                showmyAdvantage:false,
            }) 
        }   
    }
    componentDidMount(){
        console.log(this.props.state);
        const {type,name,
        headImg,
        sex,
        workTime,
        birth,
        wxNum,
        myAdvantage,company,
        myJob,
        myEmail} = this.props.state;
        if(type === 'worker'){
            this.setState({
                workInfo:{
                    name,
                    headImg,
                    sex:[sex],
                    workTime,
                    birth,
                    wxNum,
                    myAdvantage  
                }
            });
        }else{
            this.setState({
               bossInfo:{
                    headImg,
                    name,
                    company,
                    myJob,
                    myEmail
                }, 
            })
        } 
        this.setState({
            type
        })  
    }
    render() {
        const {workInfo,bossInfo,wxNum_,showWxName,showmyAdvantage,sexSelect,myAdvantage_,type,searchCompany} = this.state;
        let info = type === 'worker'?workInfo:bossInfo;
        return (
            <div className={infocss.infobox}>
                <NavBar
                    mode="light"
                    leftContent={<Icon type='left'></Icon>}
                    onLeftClick = {this.back}>
                    {type === 'worker'? '个人信息':'创建Boss名片'}
                </NavBar>   
                 <CSSTransition in={showWxName} timeout={300} classNames='my-city' unmountOnExit>
                   <div className={infocss.wxnameInfo}>
                        <WxName value={wxNum_} 
                        resivePersonInfo = {(value)=>this.resivePersonInfo(value)}
                        sureWxorName = {this.sureWxorName}
                        companySearch = {this.companySearch}
                        searchCompany = {searchCompany}
                        exitWxorName = {()=>this.exitWxorName('showWxName')}></WxName>
                    </div> 
                </CSSTransition>
                <CSSTransition in={showmyAdvantage} timeout={300} classNames='my-provice' unmountOnExit>
                   <div className={infocss.wxnameInfo}>
                        <Advantage value={myAdvantage_} 
                        advSure = {this.advSure}
                        advBlur = {this.advBlur}
                        exitWxorName = {()=>this.exitWxorName('showmyAdvantage')}
                       ></Advantage>
                    </div> 
                </CSSTransition>
                <div className={infocss['info-ul']}>
                    <ul>
                        <li>
                            <h6>头像</h6>
                            <p><span>{info.headImg}</span></p>
                        </li>
                        <li  onClick={()=>{this.reviseWXname('name')}}>
                            <h6>姓名</h6>
                            <p><span>{info.name}</span><Icon type='right'></Icon></p>
                        </li>
                        {
                            type === 'boss' && (
                                <li  onClick={()=>{this.reviseWXname('company')}}>
                                    <h6>我的公司</h6>
                                    <p><span>{bossInfo.company}</span><Icon type='right'></Icon></p>
                                </li> 
                            )
                        }
                        {
                            type === 'boss' && (
                                <li  onClick={()=>{this.reviseWXname('myJob')}}>
                                    <h6>我的职务</h6>
                                    <p><span>{bossInfo.myJob}</span><Icon type='right'></Icon></p>
                                </li> 
                            )
                        }
                        {
                            type === 'boss' && (
                                <li  onClick={()=>{this.reviseWXname('myEmail')}}>
                                    <h6>我的邮箱</h6>
                                    <p><span>{bossInfo.myEmail}</span><Icon type='right'></Icon></p>
                                </li> 
                            )
                        }
                        {
                            type === 'worker' && ( 
                                <li  onClick={()=>{this.reviseWXname('wxNum')}}>
                                    <h6>微信号</h6>
                                    <p><span>{workInfo.wxNum}</span><Icon type='right'></Icon></p>
                                </li>
                            )
                        }
                    </ul>
                    {
                        type === 'worker' && (
                            <Sex 
                                data={sexSelect} 
                                selectSex = {(key,val)=>this.selectSex(key,val)}
                                sexValue = {workInfo.sex}
                                workTime = {workInfo.workTime}
                                birth = {workInfo.birth}
                            >
                            </Sex> 
                        )
                    }
                    {
                        type === 'worker'  && (
                            <ul>
                                <li onClick={this.showMyAd}>
                                    <h6>我的优势</h6>
                                    <p>
                                        <span>{workInfo.myAdvantage}</span>
                                        <Icon type='right'></Icon>
                                    </p>
                                </li>
                            </ul>)
                    } 
                </div>
            </div>
        )
    }
}
export default Info