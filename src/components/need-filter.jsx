/*
 * @Descripttion: 学历 --薪资--经验要求筛选
 * @version: 
 * @Author: tll
 * @Date: 2019-06-22 10:16:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-06-23 10:31:44
 */
import React from 'react'
import {NavBar,Icon,Button} from 'antd-mobile'
import needcss from './need-filter.scss'
class NeedFilter extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        const {filterSection,filterSectionNum} = this.props;
        console.log(filterSection,filterSectionNum);
        return (
            <div className={needcss.sectionBox}>
                <NavBar
                    mode="light"
                    leftContent={<Icon type='cross'></Icon>}
                    onLeftClick = {()=>this.props.filterSections(false)}
                    >
                    筛选  {
                        filterSectionNum > 0 ? (<span style = {{color:'#108ee9'}}>·{filterSectionNum}</span>):''
                    }
                </NavBar>  
                <div className={needcss.section}>
                  {
                    filterSection.map((s,index)=>(
                        <div key={s.value}>
                            <h4>{s.label}
                                {
                                    s.value === 'money' ? (<span>(单选)</span>):''
                                }
                            </h4>
                            <ul>
                                {
                                    s.list.map((li,index1)=>(
                                        <li key={li.value} 
                                        className = {li.checked ? needcss.activeli:''}
                                        onClick={()=>{this.props.clickSection(index,index1,s.value)}}>{li.label}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))  
                  } 
                </div>
                <div className={needcss.footer}>
                    <Button type='default' inline onClick={this.props.clearSection}>清除</Button>
                    <Button type='primary' inline onClick = {this.props.sureSection}>确定</Button>
                </div>
            </div>
        )
    }
}
export default NeedFilter