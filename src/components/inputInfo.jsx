/*
 * @Descripttion: 输入框填写信息
 * @version: 
 * @Author: tll
 * @Date: 2019-08-14 16:52:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-15 10:56:32
 */
import React from 'react'
import {NavBar,Icon,InputItem,List,Button,TextareaItem} from 'antd-mobile'
import {createForm} from 'rc-form'
import './inputInfo.css'
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
        const {value} = this.props;
        const {setFieldsValue} = this.props.form 
        setFieldsValue({
            value:value.value
        })  
    }
    render() {
        const {value} = this.props;
        const {getFieldProps,getFieldValue} = this.props.form
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="cross" />}
                    onLeftClick={this.props.exitWxorName}
                    rightContent={
                        <Button className='wxName' onClick={()=>this.props.sureWxorName(getFieldValue('value'))}><Icon type="check" style={{ marginRight: '16px' }}/></Button>
                        
                    }
                >{value.text}</NavBar>
                <div style={{height:'20px','backgroundColor':'#f2f2f2'}}></div>
                <List>
                    {
                        value.type === 'texteara' ? (
                            <TextareaItem  rows = {value.rows} count = {value.count}
                        {...getFieldProps('value')}
                        onBlur={this.blur}/>
                        ):(<InputItem type='text' 
                            {...getFieldProps('value')}
                            onBlur={this.blur} />)
                    }
                    

                    
                </List>  
                
            </div>
        )
    }
}

export default createForm()(WxName)