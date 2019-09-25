/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-05-26 16:08:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-19 11:19:30
 */
const mongoose  = require('mongoose');
mongoose.Promise = global.Promise;
const DB_URL = 'mongodb://localhost:27017/react-boss-db'
mongoose.connect(DB_URL);
mongoose.connection.on('connected',()=>{
    console.log('mongo connect-- success');
});
mongoose.set('useFindAndModify', false);
const models = {
    counter:{
        _id: {type: String, required: true},
        seq: { type: Number, default: 0}
    },
    user:{
        username:{type:Number,require:true},
        pwd:{type:String,require:true},
        type:{type:String,require:true},
        name:{type:String,require:true},
        headImg:{type:String,require:true},
        sex:{type:String,require:true},
        workTime:{type:String,require:true},
        wxNum:{type:String,require:true},
        birth:{type:String,require:true},
        myAdvantage:{type:String,require:true},
        mostMajor:{type:String,require:true},
        //boss信息
        company:{type:Array,require:true},
        myJob:{type:String,require:true},
        myEmail:{type:String,require:true},

    }, 
    //牛人在线简历
    workerOnlineCV:{
        username:{type:Number,require:true},
        jobStatus:{type:String,require:true},
        jobHope:[{
            hopeJob:{type:String,require:true},
            hopeTrade:{type:String,require:true},
            workcity:{type:Array,require:true},
            workmoney:{type:Array,require:true},
            id:{type:Number,require:true}
        }],
        eduExp:[{
            school:{type:String,require:true},
            edu:{type:Array,require:true},
            major:{type:String,require:true},
            time:{type:Array,require:true},
            schoolExp:{type:String,require:true}
        }]
    },
    // boss创建的职位
    bossJob:{
        username:{type:Number,require:true},
        jobName: {type:String,require:true},
        red: {type:String,require:true},
        company: {type:Array,require:true},
        person: {type:String,require:true},
        personDesc: {type:String,require:true},
        headImg: {type:String,require:true},
        edu:{type:Array,require:true},
        workTime:{type:Number,require:true},
        address:{type:Array,require:true},
        jobDetail:{type:String,require:true},
        skillAsk:{type:String,require:true}
    },
    // 所有的公司信息
    company:{
        name:{type:String,require:true},
        companyId:{type:Number,require:true}
    },
    //聊天信息
    chat:{
        chatid:{type:String,require:true},
        from:{type:String,require:true},
        to:{type:String,require:true},
        content:{type:String,require:true},
        createTime:{type:Date,default:new Date().getTime()},
        read:{type:Boolean,default:false}
    }
}
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}
module.exports = {
    getModel(name){
        return  mongoose.model(name)
    }
}