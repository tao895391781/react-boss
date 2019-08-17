/*
 * @Descripttion: 高阶组件
 * @version: 
 * @Author: tll
 * @Date: 2019-07-19 18:11:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-21 09:52:03
 */
import React from 'react'

export default function HeightComponentMixFun(Wrappercomponent){
    return (
        class extends React.Component{
            constructor(props){
                super(props)
                this.goBack = this.goBack.bind(this)
                this.goPage = this.goPage.bind(this)
            }
            componentWillReceiveProps(nextProps) {
                console.log('Current props: ', this.props);
                console.log('Next props: ', nextProps);
              }
            componentDidMount(){

            }
            goBack(){
                this.props.history.go(-1)
            }
            goPage(path){
                this.props.history.push(path)
            }
            render(){
                const newProps = {
                    fun:{
                        onClick:this.goBack
                    },
                    goPage:this.goPage
                }
                return (
                     <Wrappercomponent {...newProps} {...this.props} />
                )
            }
        }
    )
}