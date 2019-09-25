/*
 * @Descripttion: 填写个人信息 微信号输入和姓名输入组件
 * @version: 
 * @Author: tll
 * @Date: 2019-06-27 09:54:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-19 15:55:04
 */
import React from 'react'
import {NavBar,Icon,InputItem,List,Button} from 'antd-mobile'
import {createForm} from 'rc-form'
import './wxName.css'
class WxName extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
        
    }
    blur = ()=>{
        const {getFieldValue} = this.props.form
        console.log(getFieldValue('value'))
        this.props.resivePersonInfo(getFieldValue('value'))  
        
    }
    componentDidMount(){   
    }
    render() {
        const {value,searchCompany,sureCompany,companyName} = this.props;
        const {getFieldProps,getFieldValue} = this.props.form
        console.log(value,companyName)
        let label = {
            name:'姓名',
            wxNum:'微信号',
            company:'公司',
            myJob:'我的职务',
            myEmail:'我的邮箱',
            hopeJob:'期望职位',
            hopeTrade:'期望行业'
        }
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="cross" />}
                    onLeftClick={this.props.exitWxorName}
                    rightContent={
                        <Button className='wxName' onClick={()=>this.props.sureWxorName(getFieldValue('value'))} disabled={sureCompany}><Icon type="check" style={{ marginRight: '16px' }}/></Button>
                        
                    }
                >{label[value.label]}</NavBar>
                <div style={{height:'20px','backgroundColor':'#f2f2f2'}}></div>
                <List>
                    {
                        value.label === 'company' ? 
                        ( 
                        <InputItem type='text' 
                            value = {companyName}
                            onChange = {this.props.companySearch}
                            onBlur={this.props.resivePersonInfo}></InputItem>):
                        (
                        <InputItem type='text' 
                        ref={this.setTextInputRef}
                            {...getFieldProps('value')}
                            onBlur={this.blur}></InputItem>
                        ) 
                    }
                </List>  
                <List>
                    {  
                        searchCompany && searchCompany.map(c=>(
                            <List.Item key={c.companyId} onClick={()=>this.props.selectCompany(c)}>{c.name}</List.Item>
                        ))   
                    }
                </List>
            </div>
        )
    }
}

export default createForm()(WxName)