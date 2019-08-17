/*
 * @Descripttion: 渲染listView长列表的高阶组件
 * @version: 
 * @Author: tll
 * @Date: 2019-08-02 14:59:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-10 15:51:35
 */
import React from 'react'
import {ListView,Toast} from 'antd-mobile'
import {getJobList,asyncGetEmployee} from '@/redux/action'
import { connect } from 'react-redux'
export default function RenderListView(Wrappercomponent,listType){
        class  Wrapper extends React.Component{
            constructor(props){
                super(props);
                const dataSource = new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                })
                this.state = {
                    dataSource,
                    isLoading: true,
                    height: '100%',
                    pageSize:5,
                    joblist:[],//职位/牛人列表
                    EndReachedThreshold:40,
                    page:1,//获取职位/牛人当前页数
                    ifJoblistEnd:false,
                    ifgetjobend:false,//上拉是否加载完成
                    ifNojobget:false,//判断是否没有职位了
                    refreshing:false,//下拉刷新状态
                    showBackTop:false,
                    scrollTopShowBackTop:1500,//滚动到多少显示回到顶部按钮  
                }
                this.initData = []
            }
            //显示loading
    show =()=>{
        Toast.loading('loading...',0);
    }
    //隐藏loading
    hide = ()=>{
       Toast.hide(); 
    }
    //发请求获取职位列表
    asyncGetJoblist = (page,refresh)=>{
        this.show(); 
        let Fn = null;
        switch(listType){
            case 'joblist':
                Fn =  getJobList;
                break;
            case 'workerlist':
                Fn = asyncGetEmployee
                break;
            default:
                break;

        }
        return new Promise((resolve,reject)=>{
           Fn(page).then(data=>{
                if(refresh){
                   this.setState({page:1})
                   this.initData = [...data.joblist];
                }else{
                   this.initData = [...this.initData,...data.joblist] 
                }
                if(!data.less){
                        this.setState({
                            page:this.state.page + 1,
                            ifNojobget:false,
                            ifgetjobend:false
                        })
                }else{
                    this.setState({
                        ifNojobget:true,
                        ifgetjobend:true
                    })
                }
                this.hide()
                resolve(data)
            })
        })
    }
    // listview滚动到临界值触发
    onScrollEnd = ()=>{
        console.log('listview滚动到临界值触发');
        const {page,ifNojobget} = this.state;
        if(!ifNojobget){
            this.asyncGetJoblist(page).then(data=>{
                this.setState({
                    ifgetjobend:true,
                    dataSource: this.state.dataSource.cloneWithRows(this.initData)
                });         
            })  
        }  
    }
     //下拉刷新职位列表
     onRefresh = ()=>{
        console.log('下拉刷新');
        this.setState({refreshing:true});
        this.asyncGetJoblist(1,'refresh').then(data=>{
            this.setState({
                refreshing:false,
                dataSource: this.state.dataSource.cloneWithRows(data.joblist)
            });
        })
    }
    //listview滚动触发
    onScroll = (e)=>{
        let ifshow = e.target.scrollTop > this.state.scrollTopShowBackTop ? true: false;
            this.setState({
                showBackTop:ifshow
            })
    }
    componentDidMount(){
        console.log(this.props)
        const {page} = this.state;
        this.asyncGetJoblist(page).then(data=>{
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data.joblist)
            }); 
        })
    }      
    render(){
        let newProps = {
            onRefresh:this.onRefresh,
            onScrollEnd:this.onScrollEnd,
            onScroll:this.onScroll,
            hide:this.hide,
            show:this.show,
            data:this.state,
            ListView:ListView,
            loginSatate:this.props.state,
            history:this.props.history
        }
            return(
                <Wrappercomponent {...newProps} />
                )
            }
        }
        return (
            connect(state=>({state:state.loginSatate}),{})(Wrapper)
        )
    
}

