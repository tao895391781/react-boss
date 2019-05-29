import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from '@/redux/store'
import '@/static/reset.css';
import './index.css'
import '@/static/font/iconfont.css'
import App from '@/components/app';
import Boss_index from '@/container/boss/boss_index'
import login from '@/container/login'
import Notfound from '@/components/404'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
const renderApp = ()=>{
    return (
        <Provider store = {store}>
            <BrowserRouter>
                <Switch>
                        <Route path='/' exact  component = {App}></Route>
                        <Route path='/login' exact  component = {App}></Route>
                        <Route path='/boss'   component = {Boss_index}></Route>
                    {/* <Route component = {Notfound}></Route> */}
                
                </Switch>        
            </BrowserRouter> 
        </Provider>
    )
}
ReactDOM.render(renderApp(), document.getElementById('root'));
