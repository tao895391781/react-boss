import React from 'react'
import {NavBar,Icon} from 'antd-mobile'
import changecss from './change-city.scss'
import {delcityText} from '@/util'
class ChangeCity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCity:false     
        }
    }
    render() {
        const {regionData,selectProviceIndex,ifhotcity,cityArr,hotCityArr,usualCityArr} = this.props;
        console.log(regionData);
        return (
            <div className={changecss['change-city']}>
                <NavBar
                    mode="light"
                    leftContent={<Icon type='left'></Icon>}
                    onLeftClick = {this.props.closeCity}>
                    选择城市
                </NavBar>  
                <div className={changecss['change-city-container']}>
                    <ul>
                        <li onClick = {()=>this.props.clickProvice('hot')} 
                            className = {ifhotcity?changecss.activeli:''}
                            >常用&热门</li>
                        {
                            regionData.map((city,index)=>(
                                <li key={city.value} 
                                onClick = {()=>this.props.clickProvice(index,city)}
                                className = {index === selectProviceIndex && !ifhotcity ? changecss.activeli:''}
                                >{delcityText(city.label)}</li>
                            ))  
                        }
                    </ul>
                    <div>
                        {
                            ifhotcity ? 
                            (
                                <div>
                                    <p>常用城市</p> 
                                    <ul>  
                                        {
                                            usualCityArr.map(city=>(
                                                <li key={city.value} onClick = {()=>this.props.switchCity(city)}>
                                                    {
                                                        city.value === '110000' ? (<i className='icondingweiweizhi iconfont'></i>):''
                                                    }
                                                    {city.label}</li>
                                            ))
                                        }
                                    </ul>
                                    <p>热门城市</p>
                                    <ul>
                                        {
                                            hotCityArr.map(city=>(
                                                <li key={city.value} onClick = {()=>this.props.switchCity(city)}>{city.label}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )  
                            : 
                            (
                                <ul>
                                    {
                                        cityArr.map(city=>(
                                            <li key={city.value} onClick = {()=>this.props.switchCity(city)}>
                                                {delcityText(city.label)}
                                            </li>
                                    ))
                                    }
                                </ul>
                            ) 
                        }   
                    </div>   
                </div>
            </div>
        )
    }
}
export default ChangeCity