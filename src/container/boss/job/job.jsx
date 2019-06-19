/*
 * @Descripttion: 消息--page
 * @version: 
 * @Author: tll
 * @Date: 2019-05-18 14:20:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-06-16 17:06:10
 */
import React,{useState} from 'react'
import ReactDom from 'react-dom'
import {Card,PullToRefresh,Toast,ListView,Tag,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {getJobList,JobList,ifgetnewJob,ifJobEnd} from '@/redux/action'
import jobcss from './job.scss'
import './job.css'
import CityFilter from '@/components/cityFilter'
import { CSSTransition } from 'react-transition-group';
@connect(state=>({state:state}),{getJobList,JobList,ifgetnewJob,ifJobEnd})
class Job extends React.Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.state = {
            dataSource,
            isLoading: true,
            height: '100%',
            pageSize:5,
            joblist:[],//职位列表
            EndReachedThreshold:40,
            page:1,//获取职位当前页数
            refreshing:false,//下拉刷新状态
            showBackTop:false,
            scrollTopShowBackTop:1500,//滚动到多少显示回到顶部按钮
            ifDownRefresh:false,//是否下拉刷新
            showCitySelect:false,//筛选--城市选择
            flag:false
        }
        this.onScroll = this.onScroll.bind(this)
        this.onScrollEnd = this.onScrollEnd.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
        this.backTop = this.backTop.bind(this)
        this.filterCity = this.filterCity.bind(this)
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
    hiderefresh=()=>{
       this.setState({refreshing:false})
    }
    //保存每次获取的职位
    saveEveryGet(data){
       this.setState({
        joblist:[...data,...this.state.joblist]
       }) 
    }
    componentDidMount(){
        //获取redux里的导航文字
        console.log(this.props)
        const {page} = this.state;
        const getjob = this.props.getJobList;
        getjob(page,this.show,this.hide,'first');
    }
     componentWillReceiveProps(nextProps) {
        if (nextProps.state.getJoblist.page !== this.props.state.getJoblist.page 
            || this.props.state.getJoblist.ifrefresh === 'first') {
            console.log('joblist更新了');
            if(nextProps.state.getJoblist.page !== this.props.state.getJoblist.page){
                    this.initData.push(...nextProps.state.getJoblist.data);
                    console.log(this.initData)
                    this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.initData)
                });
            }else{
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.state.getJoblist.data)
            });  
            }    
        }
  }
    backTop(){
        this.view.scrollTo()
    }
  //listview滚动触发
    onScroll(e){
        let ifshow = e.target.scrollTop > this.state.scrollTopShowBackTop ? true: false;
            this.setState({
                showBackTop:ifshow
            })
    }
    // listview滚动到临界值触发
    onScrollEnd(){
        console.log('listview滚动到临界值触发');
        console.log(this.props)
        const {ifgetjobend} = this.props.state;
        const {page} = this.state;
        const getjob = this.props.getJobList;
        if(!ifgetjobend){
           this.setState({
              page:page+1,
          },()=>{
             getjob(this.state.page,this.show,this.hide,'refresh');  
          }); 
        }    
    }
    //下拉刷新职位列表
    onRefresh(){
        console.log('下拉刷新');
        this.setState({refreshing:true});
        const getjob = this.props.getJobList;
        this.setState({
              page:1
          },()=>{
            getjob(1,this.show,this.hide,'first',this.hiderefresh);
          });
    }

    // 筛选---城市
    filterCity(flag){
        console.log('筛选城市')
        this.setState({
            showCitySelect:flag
        })
    }
    renderRow(job,id,i){
        return (
            <div key={i} className={jobcss['job-box']}>
                            <Card>
                                <Card.Header
                                    title={job.name} 
                                    extra={<span>{job.red}</span>}
                                    >
                                </Card.Header>
                                <Card.Body>
                                    <div><span>{job.company}</span><span>{job.companyDesc}</span></div>
                                    <div className={jobcss['job-tag']}>
                                        {
                                            job.intro.map((intro,index)=><Tag data-seed="logId" key={index}>{intro}</Tag>)
                                        }
                                        </div>
                                </Card.Body>
                                <Card.Header 
                                    className = {jobcss['job-card-header-color']}
                                    style={{padding:'3px 9px',fontSize:'14px'}}
                                    thumb={job.headImg} 
                                    thumbStyle={{width:'.2rem',height:'.2rem',borderRadius:'50%'}}
                                    title={`${job.person}·${job.personDesc}`}
                                    >
                                </Card.Header>
                            </Card>
                        </div>
        )
    }
    render() {
        const {ifgetjobend} = this.props.state
        const {showBackTop,showCitySelect} = this.state
        return (
            <div className={'pagebox '+ jobcss['job-box']}>
                    <CSSTransition in={showCitySelect} timeout={200} classNames='my-node'  unmountOnExit>
                        {
                            showCitySelect ? (
                                <div className={jobcss.cityfilter}>
                                    <CityFilter filterCity = {this.filterCity}></CityFilter>
                                </div>
                            ) :<span></span>
                        }
                    </CSSTransition>
                <div className={jobcss.filferBar}>
                    <div>
                        <span>推荐</span>
                        <span>最新</span>
                    </div>
                    <div>
                        <Tag small onChange={()=>this.filterCity(true)}>北京
                            <i className='iconarrDnR-fill iconfont'></i>
                        </Tag>
                        <Tag small>筛选
                            <i className='iconarrDnR-fill iconfont'></i>
                        </Tag>
                    </div>
                </div>
                {
                    showBackTop ? 
                    (
                        <div className={jobcss.fixedUp} onClick = {this.backTop}>
                            <i className='icondingbu iconfont'></i>
                        </div>
                    ):''
                }
                {
                    (
                        <ListView  
                            ref={el => this.view = el}
                            renderFooter={!ifgetjobend && (() => (<div style={{ padding: 15, textAlign: 'center',fontSize:25}}>
                                    <Icon type='loading' />
                                </div>))}
                            dataSource = {this.state.dataSource}
                            pageSize = {this.state.pageSize}
                            style={{
                                height: this.state.height,
                                overflow: 'auto',
                                }}
                            renderRow={(data,id,i)=>this.renderRow(data,id,i)} 
                            onEndReachedThreshold = {this.state.EndReachedThreshold}
                            onEndReached = {this.onScrollEnd}
                            onScroll = {this.onScroll}
                            scrollEventThrottle = {100}
                            pullToRefresh={<PullToRefresh
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                                />}
                            > 
                        </ListView>
                    )
                }
            </div>
        )
    }
}

export default Job