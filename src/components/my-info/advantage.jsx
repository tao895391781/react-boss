/*
 * @Descripttion: 我的优势
 * @version: 
 * @Author: tll
 * @Date: 2019-06-28 10:50:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-06-29 09:47:13
 */
import React from 'react'
import {TextareaItem,List,NavBar,Icon} from 'antd-mobile'
import {createForm} from 'rc-form'
class Advantage extends React.Component {
    render() {
        const {getFieldProps} = this.props.form;
        const {value} = this.props;
        return (
            <div>
             <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.props.exitWxorName}
                    rightContent={
                       <span onClick={this.props.advSure}>确定</span>
                    }
                >我的优势</NavBar>
            <List>
                <TextareaItem
                    placeholder='请写下你的优势...'
                    {...getFieldProps('count')}
                    rows={8}
                    count={140}
                    defaultValue = {value}
                    onBlur = {this.props.advBlur}
                />
            </List>
            </div>
        )
    }
}
export default createForm()(Advantage)