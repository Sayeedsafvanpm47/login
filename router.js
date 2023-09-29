// router.js
const express = require('express');
const router = express.Router();

const credential = {
  email: "sayeed@gmail.com",
  password: "admin123"
}




router.post('/login', (req, res) => {
 
  if (req.body.email === credential.email && req.body.password === credential.password) {
    req.session.user = req.body.email;
    res.redirect('/route/dashboard');
  } else {
   
   
    res.render('base', {errorMsg:"Invalid login credentials"});
  }
});

router.get('/login', (req, res) => {
  
  res.render('base'); 
});




router.get('/dashboard', (req, res) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  if (req.session.user) {
    if (!req.session.visitedDashboard) {
      req.session.visitedDashboard = true;
      res.render('dashboard');
    } else {
     
      if (req.session.loggedOut) {
      
        req.session.visitedDashboard = false; 
        res.redirect('/route/login');
      } else {
      
        if (!req.session.loggedOut) {
          
          req.session.cookie.maxAge = 5000; // 
          const countdown = 5;
          res.render('base', { resub: true, countdown });
        } else {
         
          const countdown = 5; 
          res.render('base', { resub: false, countdown });
        }
      }
    }
  } 
});





// logout route

router.get('/logout', (req, res) => {
  // if the user is logged in
  if (req.session.user) {
    
    const referer = req.header('referer');

   
    if (referer && referer.includes('/route/dashboard')) {
      
      req.session.destroy((err) => {
        if (err) {
          res.send("Error");
        } else {
          
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
          res.setHeader('Expires', '0');
          res.setHeader('Pragma', 'no-cache');
      
         
          res.render('base', { title: "Express", logout: "Logout success" });
        }
      });
    } else {
      
      res.redirect('/route/dashboard');
    }
  } else {
    
    res.redirect('/route/login');
  }
});









module.exports = router;
