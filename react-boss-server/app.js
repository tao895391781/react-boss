/*
 * @Descripttion: 
 * @version: 
 * @Author: tll
 * @Date: 2019-05-26 15:20:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-11 15:38:56
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const registerRouter = require('./router/register');
const usersRouter = require('./router/users');
const loginRouter = require('./router/login')
const getjoblistRouter = require('./router/job/getjoblist')
const setJobareaRouter = require('./router/job/setJobarea');
const writeInfoRouter = require('./router/my/writeinfo')
const getinfoRouter = require('./router/my/getinfo')
const getcompanyRouter = require('./router/my/search-company')
const postBossAddJobRouter = require('./router/my/postBossAddJob')
const getBossAddJobRouter = require('./router/my/getBossAddJob')
const updateBossAddJobRouter = require('./router/my/updateBossAddJob')
const deleteBossAddJobRouter = require('./router/my/delBossAddJob')
const updateAddHopeJobRouter = require('./router/my/employee/addHopeJob')
const getOnlinecvRouter = require('./router/my/employee/getOnlinecv')
const getEmployeeRouter = require('./router/job/getEmployee')
const getUserMsgListRouter  = require('./router/chat/getUserMsgList.js')
const getAllChatRouter = require('./router/chat/getAllChat')
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all("*",function(req,res,next){ 
    //设置允许跨域的域名，*代表允许任意域名跨域 
    console.log('设置跨域');
    // http://127.0.0.1:8080
    res.header("Access-Control-Allow-Origin","http://192.168.1.114:3000"); 
    //允许的header类型 
    res.header("Access-Control-Allow-Headers","content-type");
    res.header('Access-Control-Allow-Credentials', 'true');
     //跨域允许的请求方式 
     res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS"); 
     if (req.method.toLowerCase() === 'options')  {
      res.send(200)
     }else{
       next(); 
     }
    })
app.use('/register', registerRouter);
app.use('/login',loginRouter)
app.use('/users', usersRouter);
app.use('/getjob',getjoblistRouter)
app.use('/setJobarea',setJobareaRouter)
app.use('/writeinfo',writeInfoRouter)
app.use('/getinfo',getinfoRouter)
app.use('/getcompany',getcompanyRouter)
app.use('/postBossAddJob',postBossAddJobRouter)
app.use('/getBossAddJob',getBossAddJobRouter)
app.use('/updateBossAddJob',updateBossAddJobRouter)
app.use('/deleteBossAddJob',deleteBossAddJobRouter)
app.use('/updateAddHopeJob',updateAddHopeJobRouter)
app.use('/getOnlinecv',getOnlinecvRouter)
app.use('/getEmployee',getEmployeeRouter)
app.use('/getUserMsgList',getUserMsgListRouter)
app.use('/getAllChat',getAllChatRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
