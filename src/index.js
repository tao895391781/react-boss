import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from '@/redux/store'
import '@/static/reset.css';
import './index.css'
import '@/static/font/iconfont.css'
import App from '@/container/app';
import Boss_index from '@/container/boss/boss_index'

import Info from '@/container/boss/mys/info'
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
                        <Route path='/' exact  component = {App}></Route>
                        <Route path='/login' exact  component = {App}></Route>
                        <Route path='/boss'  component = {Boss_index}></Route>
                        <Route path='/info' component = {Info}></Route>
                    </Switch>
                </BrowserRouter> 
            </PersistGate>
        </Provider>
    )
}
ReactDOM.render(renderApp(), document.getElementById('root'));
