var express = require('express');
var router = express.Router();
var models = require('../models');  
const clockedin = require('../models/clockedin');






router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  models.users 
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('login');
      } else {
        res.send('This user already exist');
      }
    });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  models.users
    .findOne({
      where: {
        Username: req.body.username,
        Password: req.body.password
      }
    })
    .then(user => {
      if (user) {
        res.redirect('profile/' + user.UserId); 
      } else {
        res.send('Invalid login!');
      }
    });
});


router.get('/profile/:id', function (req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id))
    .then(user => {
      if (user) {
        res.render('profile', {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          Username: user.Username
        });
      } else {
        res.send('User not found');
      }
    });
  });
  

 

  router.get('/profile', function (req, res, next) {
    if (req.user) {
      models.users
        .findByPk(parseInt(req.user.UserId))
        .then(user => {
          if (user) {
            res.render('profile', {
              FirstName: user.FirstName,
              LastName: user.LastName,
              Email: user.Email,
              Username: user.Username
            });
          } else {
            res.send('User not found');
          }
        });
    } else {
      res.redirect('/users/login');
    }
  });

 

  router.get('/clockout', function(req, res, next) {
    res.render('clockout');
  });


 
  

  router.get('/clockin', function(req, res, next) {
    res.render('clockin');
  });



  router.post('/login', function(req, res, next) {
    res.render('/users/login');
  });








  router.post('/clockin', function(req, res, next) {
    models.clockedin   
    .create({
          FirstName: req.body.FirstName,
          LastName: req.body.LastName
        })
      .then(function(result) {
        if (!result) {
          console.log('BUMMER');
        } else {
          res.send('success you are now on the clock!')
          console.log(result);
        }
      });
  });



  
  router.post('/clockout', function(req, res, next) {
    models.clockedout   
    .create({
          FirstName: req.body.FirstName,
          LastName: req.body.LastName
        })
      .then(function(result) {
        if (!result) {
          console.log('BUMMER');
        } else {
          res.send('success you clocked out. Have a great day!!!')
          console.log(result);
        }
      });
  });














 
module.exports = router;