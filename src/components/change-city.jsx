import React from 'react'
import {NavBar,Icon,Flex} from 'antd-mobile'
import changecss from './change-city.scss'
class ChangeCity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCity:false
            
        }
        this.delcityText = this.delcityText.bind(this)
    }
    delcityText(name){
        if(!name) return null;
        if(name.indexOf('市') !== -1){
            return name.split('市')[0]
        }else if(name.indexOf('省') !== -1){
            return name.split('省')[0]
        }else if(name.indexOf('回族') !== -1){
            return name.split('回族')[0]
        }else if(name.indexOf('维吾尔') !== -1){
            return name.split('维吾尔')[0]
        }else if(name.indexOf('壮族') !== -1){
            return name.split('壮族')[0]
        }else if(name.indexOf('特别') !== -1){
            return name.split('特别')[0]
        }else if(name.indexOf('西藏') !== -1 || name.indexOf('内蒙古') !== -1){
            return name.split('自治区')[0]
        }else if(name.indexOf('自治县') !== -1){
            return name.split('自治县')[0]
        }else if(name.indexOf('自治州') !== -1){
            return name.split('自治州')[0]
        }else{
            return name
        }
    }

    render() {
        const {regionData,selectProviceIndex,ifhotcity,cityArr,hotCityArr,usualCityArr} = this.props;
        console.log(regionData);
        const PlaceHolder = ({ className = '', ...restProps }) => (
            <div className={`${className} placeholder`} {...restProps}>Block</div>
          );
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
                                >{this.delcityText(city.label)}</li>
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
                                                {this.delcityText(city.label)}
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