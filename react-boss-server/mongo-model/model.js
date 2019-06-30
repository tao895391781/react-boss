const mongoose  = require('mongoose');
mongoose.Promise = global.Promise;
const DB_URL = 'mongodb://localhost:27017/react-boss-db'
mongoose.connect(DB_URL);
mongoose.connection.on('connected',()=>{
    console.log('mongo connect-- success');
});
const models = {
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

        company:{type:String,require:true},
        myJob:{type:String,require:true},
        myEmail:{type:String,require:true},

    },
    job:{       
        name: {type:String,require:true},
        intro:{type:Array,require:true},
        red: {type:String,require:true},
        company: {type:String,require:true},
        companyDesc:{type:String,require:true},
        person: {type:String,require:true},
        personDesc: {type:String,require:true},
        headImg: {type:String,require:true},
    },
    company:{
        name:{type:String,require:true},
        companyId:{type:Number,require:true}
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