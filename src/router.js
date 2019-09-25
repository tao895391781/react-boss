/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-09-16 11:58:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-19 11:10:39
 */
//首页路由管理
import Job from '@/container/boss/job/job'
import Employee from '@/container/boss/employee/employee'
import Company from '@/container/boss/company/company'
import Message from '@/container/boss/message/message'
import My from '@/container/boss/mys/my'


import JobDetail from '@/container/boss/job/jobDetail'
import Chat from '@/container/boss/employee/chat'
import EmployeeDetail from '@/container/boss/employee/employeeDetail' 
import JobManage from '@/container/boss/mys/bossPage/job-manage'
import Info from '@/container/boss/mys/info'
import OnlineCV from '@/container/boss/mys/employeePage/onlineCV'
import AddJobHope from '@/container/boss/mys/employeePage/addJobHope'
import AddEduExp from '@/container/boss/mys/employeePage/addEduExp'
//首页子路由导航
export const childRouter = [{
    link:'/boss/addEduExp',
    component:AddEduExp
},{
    link:'/boss/addJobHope',
    component:AddJobHope
},{
    link:'/boss/onlineCV',
    component:OnlineCV
},{
    link:'/boss/info',
    component:Info
},{
    link:'/boss/jobDetail',
    component:JobDetail
},{
    link:'/boss/chat/:_id',
    component:Chat
},{
    link:'/boss/employeeDetail',
    component:EmployeeDetail
},{
    link:'/boss/JobManage',
    component:JobManage
}]

//底部导航栏路由
export const  navlist = (type) => {
    return [{
        icon:'iconposition',
        text:'职位',
        link:'/boss/job',
        component:Job,
        hidden:type === 'worker'
    },{
        icon:'iconzhaorencaixiangao',
        text:'招人',
        link:'/boss/employee',
        component:Employee,
        hidden:type === 'boss'
    },{
        icon:'iconqiye-copy',
        text:'公司',
        link:'/boss/company',
        component:Company,
        hidden:true
    }, 
    {
        icon:'iconxiaoxi1',
        text:'消息',
        link:'/boss/message',
        component:Message,
        hidden:true
    },
    {
        icon:'iconIcon_wode',
        text:'我的',
        link:'/boss/my',
        component:My,
        hidden:true
    }]
}
