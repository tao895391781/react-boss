/*
 * @Descripttion: login/注册
 * @version: 
 * @Author: tll
 * @Date: 2019-05-16 11:43:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-06-29 14:18:52
 */
import React from 'react'
import{InputItem,Button,List,Radio} from 'antd-mobile'
import logincss from './login.scss'
const RadioItem = Radio.RadioItem;
class Login extends React.Component {
    render() {
      const {hasError,username,pwd,
        showfourcode,
        ifcheckcode,
        fourcode,showRegister,roles,selectRole} = this.props;
        return (
            <div>
              <InputItem  
                className={logincss['am-input']}
                type="number"
                error={hasError}
                onChange={this.props.onChange}
                value={username}
                placeholder="请输入手机号码">手机号码</InputItem>
                {/* 注册 */}
                {
                  showRegister ? (<div className={logincss.register}>
                  <InputItem 
                  type="input" 
                  placeholder='请输入验证码'
                  disabled  = {!showfourcode}
                  onChange = {(value)=>this.props.checkcode(value)}
                  ></InputItem>
                  <p onClick = {this.props.birthcode}>
                    {
                      showfourcode ?  (fourcode.map((code,index)=><span key={index} >{code}</span>)):
                      <b className={logincss.checkcode} onClick = {this.props.showbirthcode}>获取验证码</b>  
                    }
                  </p>
                  </div>):''
                      }
                    <InputItem
                        className={logincss['am-input']}
                        type="password"
                        onChange={this.props.onChangePwd}
                        value = {pwd}
                        disabled = {ifcheckcode}
                        placeholder="请输入密码"
                    >密码</InputItem>
                  <div className={logincss.roleSelect}>
                          {
                            roles.role.map(i => (    
                            <List key={i.value} className={logincss.radioItem}>
                                <RadioItem key={i.value}
                                checked={selectRole === i.value} 
                                onChange={() => this.props.roleChange(i.value)}>
                                  {i.label}
                                </RadioItem> 
                            </List>  
                        ))
                          }
                  </div>
                  <Button type='primary' 
                  style={{"width":"80%","margin":".5rem auto"}}  
                  onClick = {this.props.registerUser}
                  >{showRegister?'注册':'登录'}</Button>)       
            </div>
        )
    }
}
export default Login

