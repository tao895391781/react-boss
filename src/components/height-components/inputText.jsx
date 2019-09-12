/*
 * @Descripttion: 输入框的高阶组件
 * @version: 
 * @Author: tll
 * @Date: 2019-08-14 16:23:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-23 18:22:46
 */
import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { createForm } from 'rc-form'
import InputInfo from '@/components/inputInfo'
import {Toast} from 'antd-mobile'
export default function InputText(Wrapper,data){
        return createForm()(
           class extends React.Component{
                constructor(props){
                    super(props)
                    this.state = {
                        data,
                        clickValue:{},
                        showView:false,
                    }
                } 
                componentDidMount(){
                    console.log(this.props);
                    if(this.props.location.state){
                        this.setState({
                            data:this.props.location.state.edu
                        })
                    }
                }
                //退出/进入 修改
                exitWxorName = (flag,target)=>{
                    console.log('进入/退出 inputText')
                    console.log(target)
                     this.setState({
                        showView:flag,
                        clickValue:target ? {...target}:{}
                    })    
                }
                goback = ()=>{
                    this.props.history.go(-1)
                }
                 //确定修改
                sureWxorName = (val)=>{
                    console.log(val);
                    if(!val){
                        Toast.fail('请输入',1)
                        return;
                    }
                    const {label} = this.state.clickValue;
                    this.setState({
                        data:{...this.state.data,[label]:val},
                        showView:false
                    })
                }
                render(){
                    const newProps = {
                        exitWxorName:this.exitWxorName,
                        sureWxorName:this.sureWxorName,
                        goback:this.goback,
                        data:this.state.data,
                        ...this.props,
                        type:this.props.location.state ? {type:'update',_id:this.state.data._id}:{type:'add'}
                    }
                    const {showView,clickValue} = this.state
                    return (
                        <>
                            <CSSTransition in={showView} timeout={300} classNames='my-provice' unmountOnExit>
                                <div className='fixWindow'>
                                    <InputInfo 
                                        value={clickValue} 
                                        sureWxorName = {this.sureWxorName}
                                        resivePersonInfo  ={()=>{}}
                                        exitWxorName = {()=>this.exitWxorName(false)}
                                    ></InputInfo>
                                </div> 
                            </CSSTransition>
                            <Wrapper {...newProps}></Wrapper> 
                        </>
                    )
                } 
           } 
        )
}