/*
 * @Descripttion: 选择器
 * @version: 
 * @Author: tll
 * @Date: 2019-07-20 14:51:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-20 16:50:12
 */
import React,{useEffect} from 'react'
import {Picker,List} from 'antd-mobile'
import { createForm } from 'rc-form';

function PickerSelect(props){
    console.log(props)
    const {getFieldProps} = props.form
    const {data} = props;
    useEffect(()=>{
        console.log(props)
    })
    return (
        <List>
            <Picker  cols={1} 
                {...getFieldProps('select')}
                onOk = {(v)=>props.selectOption(v)}
                {...data}>
                <List.Item arrow="horizontal">{props.text}</List.Item>
            </Picker> 
        </List>
    )
}
export default createForm()(PickerSelect)