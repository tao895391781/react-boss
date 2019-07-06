/*
 * @Descripttion: 填写个人信息 微信号输入和姓名输入组件
 * @version: 
 * @Author: tll
 * @Date: 2019-06-27 09:54:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-04 14:18:21
 */
import React from 'react'
import {NavBar,Icon,InputItem,List,Button} from 'antd-mobile'
import './wxName.css'
class WxName extends React.Component {
    render() {
        const {value,searchCompany,sureCompany,companyName} = this.props;
        console.log(value,companyName);
        let label = {
            name:'姓名',
            wxNum:'微信号',
            company:'公司',
            myJob:'我的职务',
            myEmail:'我的邮箱'
        }
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="cross" />}
                    onLeftClick={this.props.exitWxorName}
                    rightContent={
                        <Button className='wxName' onClick={this.props.sureWxorName} disabled={sureCompany}><Icon type="check" style={{ marginRight: '16px' }}/></Button>
                        
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
                            defaultValue={value.value} 
                            onBlur={this.props.resivePersonInfo}></InputItem>
                        ) 
                    }
                </List>  
                <List>
                    {  
                        searchCompany.map(c=>(
                            <List.Item key={c.companyId} onClick={()=>this.props.selectCompany(c)}>{c.name}</List.Item>
                        ))   
                    }
                </List>
            </div>
        )
    }
}

export default WxName