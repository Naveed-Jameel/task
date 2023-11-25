var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');
const { default: mongoose } = require('mongoose');

require("dotenv").config()
var app = express();

// Allow requests from http://localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use('/post', postsRouter);
app.use('/comment', commentsRouter);

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
  res.render('error');
});

// db connection
const db_url="mongodb+srv://naveedjameel781:sp19bse155@cluster0.lrtgijo.mongodb.net/task?retryWrites=true&w=majority"
mongoose.connect(db_url) 

mongoose.connection.on("connected",()=>{
  console.log("mongo db connected successfully!")
})

mongoose.connection.on("error",()=>{
  console.log("error while connected db!") 
})

module.exports = app;
