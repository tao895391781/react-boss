/*
 * @Descripttion: 城市级联选择器
 * @version: 
 * @Author: tll
 * @Date: 2019-06-16 12:05:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-06-16 18:23:59
 */
import React from 'react'
import {NavBar,Icon,Button,Flex} from 'antd-mobile'
import './cityFilter.css'
import citycss from './cityFilter.scss'
const list = require('china-location/dist/location.json');
const ChinaLocation = require('china-location');
const location = new ChinaLocation(list);
class cityFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            city:location.currentProvinces,
            area:location.currentDistricts,  
        }
        this.closeCity = this.closeCity.bind(this)
    }
    componentDidMount(){
    console.log(location)  
    }
    closeCity(){
        this.props.filterCity(false);  
    }
    render() {
        return (
            <div className={citycss.navbar}>
                  <NavBar
                    mode="light"
                    leftContent={<Icon type='cross'></Icon>}
                    onLeftClick = {this.closeCity}
                    rightContent={<span>切换城市</span>}>
                北京
                </NavBar>  
                  
                <div  className = {citycss.filter}>
                    <ul>
                        <li>常用城市</li>
                        {

                        }
                        <li>地铁</li>
                        <li>附近</li>
                    </ul>
                    <ul></ul>
                    <ul></ul>
                </div>
                <div className={citycss.footer}>
                    <Button type='default' inline>清除</Button>
                    <Button type='primary' inline>确定</Button>
                </div>
            </div>
        )
    }
}

export default cityFilter