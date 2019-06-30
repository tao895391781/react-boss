const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const registerRouter = require('./routes/register');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login')
const uploadjoblistRouter = require('./routes/uploadjoblist')
const getjoblistRouter = require('./routes/getjoblist')
const setJobareaRouter = require('./routes/setJobarea');
const writeInfoRouter = require('./routes/writeinfo')
const getinfoRouter = require('./routes/getinfo')
const getcompanyRouter = require('./routes/search-company')
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
    res.header("Access-Control-Allow-Origin","http://192.168.1.112:3000"); 
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
app.use('/uploadjob',uploadjoblistRouter)
app.use('/getjob',getjoblistRouter)
app.use('/setJobarea',setJobareaRouter)
app.use('/writeinfo',writeInfoRouter)
app.use('/getinfo',getinfoRouter)
app.use('/getcompany',getcompanyRouter)
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
