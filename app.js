
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , Facebook = require('facebook-node-sdk');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(Facebook.middleware({ appId: '221841834607719', secret: '99daa54c161fb58389aa77f01556c4a3' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

function facebookGetUser() {
  return function(req, res, next) {
    req.facebook.getUser( function(err, user) {
      if (!user || err){
        res.render('login',{title:"you need to login"});
      } else {
        req.user = user;
        next();
      }
    });
  }
}

app.get('/login', Facebook.loginRequired( {scope: ['user_photos', 'friends_photos', 'publish_stream']}), function(req, res){
  res.redirect('/');
});

app.post('/picSubmit', user.newComment);
app.get('/', facebookGetUser(), user.do);
app.post('/submitted', user.buttonPush);
app.get('/logout', facebookGetUser(), user.logout);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
