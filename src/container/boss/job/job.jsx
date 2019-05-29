/*
 * @Descripttion: 消息--page
 * @version: 
 * @Author: tll
 * @Date: 2019-05-18 14:20:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-05-23 11:47:02
 */
import React from 'react'
import {withRouter} from 'react-router-dom'
class Job extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            job:'web开发'
        }
    }
    componentDidMount(){
       this.timeId =  setTimeout(()=>{
            this.setState({
            job:'java开发'
        }) 
        },2000);
        //获取redux里的导航文字

       
    }
    componentWillUnmount(){
        clearTimeout(this.timeId)
    }
    render() {
        const {job} = this.state;
        console.log(this.props);
        return (
            <div className='pagebox'>
               职位页面
               {job}
            </div>
        )
    }
}

export default Job