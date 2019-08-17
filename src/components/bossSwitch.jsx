/*
 * @Descripttion: 渲染
 * @version: 
 * @Author: tll
 * @Date: 2019-08-01 14:03:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-01 17:29:14
 */
import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
export default  function bossRouter(props){
    const {navlist,type} = props
    return (
          <Switch>
            {
                navlist.map((item,index)=>(
                    <Route path = {item.link}  exact component = {item.component} key={index} /> 
                    ) 
                )  
            }
            {
                type === 'worker' ? 
                (<Redirect from='/boss' to='/boss/job'></Redirect>):
                (<Redirect from='/boss' to='/boss/employee'></Redirect>)
            }
          
        </Switch>      
    )
}