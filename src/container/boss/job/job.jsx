/*
 * @Descripttion: 消息--page
 * @version: 
 * @Author: tll
 * @Date: 2019-05-18 14:20:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-06 11:31:47
 */
import React from 'react'
import ReactDom from 'react-dom'
import {Card,PullToRefresh,Toast,ListView,Tag,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {isEqual} from 'underscore'
import {getJobList,JobList,ifgetnewJob,ifJobEnd} from '@/redux/action'
import jobcss from './job.scss'
import CityFilter from '@/components/cityFilter'
import ChangeCity from '@/components/change-city'
import NeedFilfer from '@/components/need-filter'
import { CSSTransition } from 'react-transition-group';
import { regionData} from 'element-china-area-data'
import hotCity from './job-hot-city'
import filterSectionss from './filter-section'
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
            showProviceSelect:false,//省份选择
            showSectionSelect:false,//筛选选项
            selectProviceIndex:-1,//选指省份的索引
            ifhotcity:true,//显示热门城市
            cityArr:[],//城市列表
            usualCityArr:[hotCity[0]],//常用城市列表
            hotCityArr:hotCity,//热门城市列表
            currentProvice:'',//选中的城市
            currentCity:hotCity[0],//选中的城市
            currentArea:{
                label:'',
                value:''
            },//当前选中的区或县
            filterSection:filterSectionss,
            filterSectionNum:0,//选中的选项的个数
        }
        this.onScroll = this.onScroll.bind(this)
        this.onScrollEnd = this.onScrollEnd.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
        this.backTop = this.backTop.bind(this)
        this.filterSections = this.filterSections.bind(this)
        this.filterCity = this.filterCity.bind(this)
        this.changeCity = this.changeCity.bind(this)
        this.closeCity = this.closeCity.bind(this)
        this.clickProvice = this.clickProvice.bind(this)
        this.switchCity = this.switchCity.bind(this)
        this.selectArea = this.selectArea.bind(this)
        this.saveArea = this.saveArea.bind(this)
        this.clearArea = this.clearArea.bind(this)
        this.clickSection = this.clickSection.bind(this)
        this.sureSection = this.sureSection.bind(this)
        this.clearSection = this.clearSection.bind(this)
        this.initData = []
    }
    //选中的区或县
    selectArea(index,city){
        console.log(city)
        if(index!=='flag'){
            this.setState({
                currentArea:city
            })
        }else{
            this.setState({
                currentArea:{
                    label:'',
                    value:''
                }
            }) 
        }
        localStorage.setItem('currentArea',JSON.stringify(city))
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
     componentWillReceiveProps(nextProps) {
         console.log(nextProps)
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
        // 职位地区更新
        if(!isEqual(nextProps.state.loginSatate.jobArea,this.props.state.loginSatate.jobArea)){
            console.log('职位地区更新了');
            const {jobArea} = nextProps.state.loginSatate
            for(let job in jobArea){
                this.setState({
                    [job]:jobArea[job]
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
    filterSections(flag){
        this.setState({
            showSectionSelect:flag
        })
    }
    // 筛选---城市
    filterCity(flag){
        this.setState({
            showCitySelect:flag,
        })
    }
    //切换城市
    changeCity(flag){
        this.setState({
            showProviceSelect:flag,
            showCitySelect:!flag,
            ifhotcity:true
        }) 
    }
    //关闭切换城市，回到职位列表
    closeCity(){
        this.setState({
            showProviceSelect:false,
            showCitySelect:false,  
        })  
        this.hide(); 
    }
    //点击省获取对应的市/区
    clickProvice(index,city){
        console.log(index,city)
        if(index!=='hot'){
            if((city.children && city.children[0].label === '市辖区') || city.value==='710000'){
               this.setState({cityArr:[{
                   label:city.label,
                   value:city.value,
                   children:city.children
               }]}) 
            }else{
                this.setState({cityArr:city.children})  
            }
            this.setState({
                selectProviceIndex:index,
                ifhotcity:false,
                currentProvice:{
                    label:city.label,
                    value:city.value
                }
            }) 
        }else{
            this.setState({
                ifhotcity:true
            }) 
        }
    }
    //确认切换城市
    switchCity(city){
        console.log(this.state.currentProvice)
        console.log(city)
        const {label,value} = city;
        let cityArr = [];
        if(city.children[0].label === '市辖区'){
            if(city.children[1] && city.children[1].label === '县'){
                cityArr = [...city.children[0].children,...city.children[1].children];
            }else{
                cityArr = city.children[0].children;
            }
        }else{
            cityArr = city.children;
        }
        this.setState({
            currentCity:{
                value,
                label,
                children:cityArr
            },
            currentArea:{
                label:'',
                value:''
            }
        },()=>{
            this.closeCity();
        });
        //选择的城市加入常用城市----用localStorage存储
        const {usualCityArr}  = this.state;
        if(localStorage.getItem('usual-city')){
           const localUsualCity =  JSON.parse(localStorage.getItem('usual-city'));
           let ifExitcity = localUsualCity.find(v=> v.value === city.value)
           //常用数组不存在当前选择的城市，添加操作
           if(!ifExitcity){
                localUsualCity.push(city);
           }
           //最多存四个城市,每次添加一个新的删除第二个
           if(localUsualCity.length>4){
               localUsualCity.splice(1,1)
           }
           
           localStorage.setItem('usual-city',JSON.stringify(localUsualCity)); 
        }else{
            //第一次存储
            let ifExitcity = usualCityArr.find(v=> v.value === city.value);
            //常用数组不存在当前选择的城市，添加操作
            if(!ifExitcity){
                usualCityArr.push(city);
            }
            localStorage.setItem('usual-city',JSON.stringify(usualCityArr)); 
        }   
        this.setState({
            usualCityArr:JSON.parse(localStorage.getItem('usual-city'))
        });
        let currentCity = {
            label:city.label,
            value:city.value,
            children:cityArr
        };
        sessionStorage.setItem('currentCity',JSON.stringify(currentCity));
    }
    //将选择的区/县保存到数据库
    saveArea(){
        const {currentCity,currentArea} = this.state;
        console.log(currentCity,currentArea);
        sessionStorage.setItem('currentCity',JSON.stringify(currentCity));
        sessionStorage.setItem('currentArea',JSON.stringify(currentArea));
        this.closeCity();
    }
    // 清除选择的区/县
    clearArea(){
        console.log('清除Area');
        if(this.state.currentArea.label){
           this.setState({
                currentArea:{
                    label:'',
                    value:''
                }
            }) 
        }  
    }
    //点击了选项
    clickSection(index,index1,value){
        const {filterSection} = this.state;
        const {checked} = filterSection[index].list[index1];
        if(value === 'money'){
            console.log('money')
            let ifSelected = filterSection[index].list.find(item => item.checked === true);
            // 薪资单选  -- 存在选项 
            if(ifSelected){
                for(let i = 0;i<filterSection[index].list.length;i++){
                    filterSection[index].list[i].checked = false;
                }
            }
        }
        let section = Object.assign({},filterSection[index].list[index1],{checked:!checked});
        filterSection[index].list.splice(index1,1,section);
        let filterNum = 0;
        filterSection.forEach(f=>{
            f.list.forEach(li=>{
                if(li.checked && li.value !== 'all'){
                    filterNum++
                }
            });
        })
        this.setState({
            filterSection,
            filterSectionNum:filterNum
        })
    }
    //保存选项
    sureSection(){
       this.setState({
            showSectionSelect:false
       }) 
    }
    //清除选项
    clearSection(){
        const {filterSection} = this.state;
        let filterArr = [];
        filterSection.forEach(f=>{
            f.list.forEach(li=>{
                if(li.checked && li.value !== 'all'){
                    li.checked = false;
                }
            });
            filterArr.push(f);
        })
        this.setState({
            filterSection:filterArr,
            filterSectionNum:0
        })
    }
    componentDidMount(){
        //获取redux里的导航文字
        const {page} = this.state;
        const getjob = this.props.getJobList;
        getjob(page,this.show,this.hide,'first')
        //获取localStorage里面的常用城市列表
        if(localStorage.getItem('usual-city')){
            this.setState({
                usualCityArr:JSON.parse(localStorage.getItem('usual-city'))
            })
        }
        if(sessionStorage.getItem('currentCity')){
            let currentCity = JSON.parse(sessionStorage.getItem('currentCity'));
            this.setState({
                currentCity
            })
        }
        if(sessionStorage.getItem('currentArea')){
            let currentArea = JSON.parse(sessionStorage.getItem('currentArea'));
            this.setState({
                currentArea
            })
        }
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
        const {showBackTop,showCitySelect,showProviceSelect,ifhotcity,cityArr,hotCityArr,usualCityArr,currentCity,currentArea,showSectionSelect,filterSection,filterSectionNum} = this.state
        return (
            <div className={'pagebox '+ jobcss['job-box']}>
                {/* 筛选城市 */}
                <CSSTransition in={showCitySelect} timeout={300} classNames={showProviceSelect?'my-city1':'my-city'} unmountOnExit>
                    <div className='fixWindow'>
                        <CityFilter filterCity = {this.filterCity} 
                            selectArea = {(index,city)=>this.selectArea(index,city)}
                            currentCity = {currentCity}
                            currentArea = {currentArea}
                            saveArea = {this.saveArea}
                            clearArea = {this.clearArea}
                            changeCity = {this.changeCity}></CityFilter>
                    </div>
                </CSSTransition>
                {/* 切换城市 */}
                <CSSTransition in = {showProviceSelect} timeout={300} classNames='my-provice' unmountOnExit>
                    <div className='fixWindow'>
                        <ChangeCity closeCity = {this.closeCity} 
                            switchCity = {(city)=>this.switchCity(city)}
                            regionData = {regionData} 
                            ifhotcity = {ifhotcity}
                            cityArr = {cityArr}
                            hotCityArr = {hotCityArr}
                            usualCityArr = {usualCityArr}
                            clickProvice = {(index,city)=>this.clickProvice(index,city)}
                            selectProviceIndex = {this.state.selectProviceIndex}
                            >
                        </ChangeCity>
                    </div>
                </CSSTransition>
                <CSSTransition in = {showSectionSelect} timeout = {300} classNames = 'my-city' unmountOnExit>
                    <div className={jobcss.cityfilter}>
                        <NeedFilfer 
                            clickSection = {(index,index1,value)=>{this.clickSection(index,index1,value)}}
                            filterSection = {filterSection} 
                            sureSection = {this.sureSection}
                            clearSection = {this.clearSection}
                            filterSectionNum  = {filterSectionNum}
                            filterSections = {(flag)=>this.filterSections(flag)}>
                        </NeedFilfer>
                    </div>
                </CSSTransition>
                <div className={jobcss.filferBar}>
                    <div>
                        <span>推荐</span>
                        <span>最新</span>
                    </div>
                    <div>
                        <Tag small onChange={()=>this.filterCity(true)}>
                            {
                                currentCity.label
                            }
                            <i className='iconarrDnR-fill iconfont'></i>
                        </Tag>
                        <Tag small onChange = {()=>this.filterSections(true)}>
                            筛选
                            {
                                filterSectionNum ? (<span>·{filterSectionNum}</span>):''
                            }
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