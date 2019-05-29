/*
 * @Descripttion: Boss登录页面
 * @version: 
 * @Author: tll
 * @Date: 2019-05-16 11:42:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-05-25 17:49:31
 */
import React from 'react'
import Login from '@/components/login'
class Boss_index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <div className='pagebox'>
               <Login></Login> 
            </div>
        )
    }
}

export default Boss_index