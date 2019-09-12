/*
 * @Descripttion: 牛人列表
 * @version: 
 * @Author: tll
 * @Date: 2019-06-29 16:39:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-31 17:25:43
 */
import React from 'react'
import {Icon,PullToRefresh,Card,Tag,WhiteSpace} from 'antd-mobile'
import jobcss from '@/container/boss/job/job.scss'
import RenderListView from '@/components/height-components/renderListView'
class Employee extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    renderRow(job,id,i){
        return (
            <div key={i} className={jobcss['job-box']} 
                    onClick = {()=>this.props.history.push({pathname:'/employeeDetail',state:job})}>
                    <WhiteSpace />
                            <Card>
                                <Card.Header
                                    title={job.hopeJob} 
                                    extra={job.workmoney.map((intro,index)=><span key={index}>
                                        {
                                            index!==0 && <span>-</span>
                                        }
                                        {intro}
                                        </span>)}
                                    >
                                </Card.Header>
                            <Card.Body>
                                    <Tag data-seed="logId">{job.workcity[1].label}</Tag>
                                    &nbsp;&nbsp;
                                    <Tag data-seed="logId">{job.hopeTrade}</Tag>
                                </Card.Body>
                            </Card>
                        </div>
        )
    }
    render() {
        const {ListView} = this.props;
        const {ifgetjobend} = this.props.data
        return (
            <div className='pagebox'>
                    <ListView  
                                    ref={el => this.view = el}
                                    renderFooter={!ifgetjobend && (() => (<div style={{ padding: 15, textAlign: 'center',fontSize:25}}>
                                            <Icon type='loading' />
                                        </div>))}
                                    dataSource = {this.props.data.dataSource}
                                    pageSize = {this.props.data.pageSize}
                                    style={{
                                        height: this.props.data.height,
                                        overflow: 'auto',
                                        }}
                                    renderRow={(data,id,i)=>this.renderRow(data,id,i)} 
                                    onEndReachedThreshold = {this.props.EndReachedThreshold}
                                    onEndReached = {this.props.onScrollEnd}
                                    onScroll = {this.props.onScroll}
                                    scrollEventThrottle = {100}
                                    pullToRefresh={<PullToRefresh
                                        refreshing={this.props.refreshing}
                                        onRefresh={this.props.onRefresh}
                                        />}
                                    > 
                    </ListView>
            </div>
        )
    }
}

export default RenderListView(Employee,'workerlist')