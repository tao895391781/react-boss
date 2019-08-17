/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-06-22 10:25:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-06-22 10:25:51
 */
//职位筛选
export default [
    {
        label:'学历要求',
        value:'edu',
        list:[
        {
            label:'全部',
            value:'all',
            checked:true
        },{
            label:'初中及以下',
            value:'chuzhong',
            checked:false
        },{
            label:'中专/中技',
            value:'zhongzhuan',
            checked:false
        },{
            label:'高中',
            value:'gaozhong',
            checked:false
        },{
            label:'大专',
            value:'dazhuan',
            checked:false
        },{
            label:'本科',
            value:'benke',
            checked:false
        },{
            label:'硕士',
            value:'shuoshi',
            checked:false
        },{
            label:'博士',
            value:'boshi',
            checked:false
        }  
        ]
    },
    {
        label:'薪资待遇',
        value:'money',
        list:[
        {
            label:'全部',
            value:'all',
            checked:true
        },{
            label:'3k以下',
            value:'3000',
            checked:false
        },{
            label:'3-5k',
            value:'3000-5000',
            checked:false
        },{
            label:'5-10k',
            value:'5000-10000',
            checked:false
        },{
            label:'10-20k',
            value:'10000-20000',
            checked:false
        },{
            label:'20-50k',
            value:'20000-50000',
            checked:false
        },{
            label:'50k以上',
            value:'50000',
            checked:false
        }, 
    ]
},
    {
        label:'经验要求',
        value:'exp',
        list:[
        {
            label:'全部',
            value:'all',
            checked:true
        },{
            label:'在校生',
            value:'student',
            checked:false
        },{
            label:'应届生',
            value:'graduate',
            checked:false
        },{
            label:'1年以内',
            value:'1',
            checked:false
        },{
            label:'1-3年',
            value:'1-3',
            checked:false
        },{
            label:'3-5年',
            value:'3-5',
            checked:false
        },{
            label:'5-10年',
            value:'5-10',
            checked:false
        },{
            label:'10年以上',
            value:'10',
            checked:false
        }
    ]
    },
    {
        label:'行业分类',
        value:'type',
        list:[
        {
            label:'全部',
            value:'all',
            checked:true
        },{
            label:'电子商务',
            value:'elect-commerce',
            checked:false
        },{
            label:'游戏',
            value:'game',
            checked:false
        },{
            label:'媒体',
            value:'media',
            checked:false
        },{
            label:'广告营销',
            value:'ad-market',
            checked:false
        },{
            label:'数据服务',
            value:'data-server',
            checked:false
        },{
            label:'医疗健康',
            value:'medical-health',
            checked:false
        },{
            label:'生活服务',
            value:'live-server',
            checked:false
        },{
            label:'O2O',
            value:'O2O',
            checked:false
        }
    ]
    },
  {
        label:'公司规模',
        value:'company',
        list:[
        {
            label:'全部',
            value:'all',
            checked:true
        }, {
            label:'0-20人',
            value:'0-20',
            checked:false
        }, {
            label:'20-99人',
            value:'20-99',
            checked:false
        }, {
            label:'100-499人',
            value:'100-499',
            checked:false
        }, {
            label:'500-999人',
            value:'500-999',
            checked:false
        }, {
            label:'1000-999人',
            value:'1000-999',
            checked:false
        }, {
            label:'10000人以上',
            value:'10000',
            checked:false
        }
    ]
    },
   {
        lebel:'融资阶段',
        value:'finance',
        list:[
        {
            label:'全部',
            value:'all',
            checked:true
        },{
            label:'未融资',
            value:'none',
            checked:false
        },{
            label:'天使轮',
            value:'angel',
            checked:false
        },{
            label:'A轮',
            value:'A',
            checked:false
        },{
            label:'B轮',
            value:'B',
            checked:false
        },{
            label:'C轮',
            value:'C',
            checked:false
        },{
            label:'D轮',
            value:'D',
            checked:false
        },{
            label:'已上市',
            value:'listed',
            checked:false
        },{
            label:'不需要融资',
            value:'without',
            checked:false
        }   
    ]
}  
]