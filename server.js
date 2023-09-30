const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')


app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});

app.use(express.json())
app.use(express.urlencoded())

app.set('view engine','ejs')


const credentials = {
  email : "sayeed@gmail.com",
  password : "admin123"
}

app.use(session({
  secret:"secret-key",
  resave:false,
  saveUninitialized:false
}))

function isSigned(req,res,next){
  if(req.session.isLogged){
    next()
  }
  else{
    res.redirect('/')
  }
  
}

app.use('/static',express.static(path.join(__dirname,'/public')))
app.use('/assets',express.static(path.join(__dirname,'/public/assets')))

app.get('/',(req,res)=>{
  if(req.session.isLogged)
  {
    res.redirect('/dashboard')
  }
  else{
    res.render('./base')
  }
})

app.post('/login',(req,res)=>{
if(req.body.email===credentials.email && req.body.password===credentials.password){
  req.session.user = req.body.email;
  req.session.isLogged = true;
  res.redirect('/dashboard')
}
else{
 
  res.render('base',{error:"Invalid credentials"})
}
})

app.get('/dashboard',isSigned,(req,res)=>{
 res.render('dashboard')
})

app.get('/logout',(req,res)=>{
  req.session.destroy()
  // res.redirect('/')
  res.render('base',{logout:"Logout succesfull"})
})

app.listen(3300,()=>console.log("Session started"))