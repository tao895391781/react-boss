const mongoose  = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/react-boss-db'
mongoose.connect(DB_URL);
mongoose.connection.on('connected',()=>{
    console.log('mongo connect-- success');
})
const models = {
    user:{
        username:{type:Number,'require':true},
        pwd:{type:String,'require':true},
        type:{type:String,'require':true},
        age:{type:Number,'require':false}
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