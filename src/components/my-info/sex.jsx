/*
 * @Descripttion: 性别 参加工作时间  生日 组件
 * @version: 
 * @Author: tll
 * @Date: 2019-06-27 15:02:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-20 11:33:31
 */
import React from 'react'
import {Picker,List,DatePicker} from 'antd-mobile'
import { createForm } from 'rc-form';
import './sex.css'
class Sex extends React.Component {
    render() {
        const {data,sexValue,workTime,birth} = this.props;
        const { getFieldProps } = this.props.form;
        return (
            <List className='sexBox'>
                <Picker data={data} cols={1} 
                    {...getFieldProps('district3')}
                    value={sexValue}
                    onOk={(val)=>this.props.selectSex('sex',val)}>
                    <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
                <DatePicker
                    mode='date'
                    title="参加工作时间"
                    extra="请选择"
                    maxDate = {new Date()}
                    value={new Date(workTime)}
                    format='YYYY-MM-DD'
                    onOk={(val)=>this.props.selectSex('workTime',val)}
                    >
                    <List.Item arrow="horizontal">参加工作时间</List.Item>
                </DatePicker>
                <DatePicker
                    mode='date'
                    title="出生日期"
                    extra="请选择"
                    value={new Date(birth)}
                    format='YYYY-MM-DD'
                    minDate={new Date('1990-01-01')}
                    maxDate = {new Date()}
                    onOk={(val)=>this.props.selectSex('birth',val)}
                    >
                    <List.Item arrow="horizontal">出生日期</List.Item>
                </DatePicker>
            </List>
        )
    }
}
export default createForm()(Sex);