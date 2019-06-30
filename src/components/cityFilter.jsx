/*
 * @Descripttion: 城市级联选择器
 * @version: 
 * @Author: tll
 * @Date: 2019-06-16 12:05:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-06-21 14:47:44
 */
import React from 'react'
import {NavBar,Icon,Button} from 'antd-mobile'
import './cityFilter.css'
import citycss from './cityFilter.scss'
class cityFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
    }
    render() {
        const {currentCity,currentArea} = this.props;
        console.log(currentCity,currentArea)
        return (
            <div className={citycss.navbar}>
                    <NavBar
                        mode="light"
                        leftContent={<Icon type='cross'></Icon>}
                        onLeftClick = {()=>this.props.filterCity(false)}
                        rightContent={<span onClick = {()=>this.props.changeCity(true)}>切换城市</span>}>
                            北京
                    </NavBar>  
                <div  className = {citycss.filter}>
                    <ul>
                        <li>商圈</li>
                        {/* <li>地铁</li>
                        <li>附近</li> */}
                    </ul>
                    <ul>
                        <li className = { !currentArea.label ? citycss.activeli:''}
                        onClick = {()=>this.props.selectArea('flag')}
                        >全{currentCity.label}</li>
                        {
                            currentCity.children.map((city,index)=>(
                                <li key={city.value} 
                                className = {(currentArea.value === city.value) ? citycss.activeli:''}
                                onClick = {()=>this.props.selectArea(index,city)}>{city.label}</li>
                            )) 
                        }
                    </ul>
                    <ul>
                        <li className = {citycss.activeli}>全
                            {
                                !currentArea.label? (
                                    currentCity.label
                                ):(
                                    currentArea.label 
                                )
                            }
                            <i className='iconfont icongou'></i>
                            </li>
                    </ul>
                </div>
                <div className={citycss.footer}>
                    <Button type='default' inline onClick={this.props.clearArea}>清除</Button>
                    <Button type='primary' inline onClick = {this.props.saveArea}>确定</Button>
                </div>
            </div>
        )
    }
}

export default cityFilter