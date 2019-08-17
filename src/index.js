/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-05-15 14:42:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-14 15:29:01
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from '@/redux/store'
import '@/static/reset.css';
import './index.css'
import '@/static/font/iconfont.css'
import App from '@/container/app';
import Boss_index from '@/container/boss/boss_index'
import OnlineCV from '@/container/boss/mys/employeePage/onlineCV'
import AddJobHope from '@/container/boss/mys/employeePage/addJobHope'
import Info from '@/container/boss/mys/info'
import JobManage from '@/container/boss/mys/bossPage/job-manage'
import EmployeeDetail from '@/container/boss/employee/employeeDetail' 
import AddEduExp from '@/container/boss/mys/employeePage/addEduExp'
// import Notfound from '@/components/404'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {persistor} from '@/redux/store'
import {PersistGate} from 'redux-persist/lib/integration/react';
const renderApp = ()=>{
    return (
        <Provider store = {store}>
            <PersistGate loading = {null} persistor = {persistor}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact  component = {App} />
                        <Route path='/login' exact  component = {App} />
                        <Route path='/boss'   component = {Boss_index} />
                        <Route path='/info' component = {Info} />
                        <Route path='/JobManage' component = {JobManage} />
                        <Route path='/onlineCV' component = {OnlineCV} />
                        <Route path='/addJobHope' component = {AddJobHope} />
                        <Route path='/employeeDetail' component = {EmployeeDetail} />
                        <Route path='/addEduExp' component = {AddEduExp}  />>
                    </Switch>
                </BrowserRouter> 
            </PersistGate>
        </Provider>
    )
}
ReactDOM.render(renderApp(), document.getElementById('root'));
