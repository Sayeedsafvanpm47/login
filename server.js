const express = require('express')
const app = express()
const path = require('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const {v4:uuidv4} = require('uuid')
const router = require('./router')
var createError = require('http-errors')
const cookieParser = require('cookie-parser')


require("dotenv").config();
app.use(function(req,res,next){
  res.header('Cache-Control','no-cache,no-store')
  next()
})


const port = process.env.PORT || 8080



app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
          extended:true
}))

app.use(cookieParser())


app.set('view engine','ejs')

// load static file
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))


app.use(session({
          secret:"secret-key",
          cookie:{secure:false,httpOnly:false},
          resave:false,
          saveUninitialized:false
}))



app.use('/route',router)

app.get('/',(req,res)=>{

          res.render('base',{title:"Login System"})
})



app.listen(port,()=>console.log("Listening to the server on 3000 "))