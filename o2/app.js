var express = require('express');
var passport = require('passport');

var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy

passport.serializeUser(function(user, done) {
	    done(null, user);
});

passport.deserializeUser(function(obj, done) {
	    done(null, obj);
});

passport.use(new GoogleStrategy({
	        clientID: '492957928974-m787u6t7r2lkp847sttu8gusi8bc0jja.apps.googleusercontent.com',
	        clientSecret: 'P4Wqn5OOxwZ3jKfZ992VZwGG',
	        callbackURL: 'www.naver.com'
	    }, function(accessToken, refreshToken, profile, done) {
		            process.nextTick(function() {
				                user = profile;
				                return done(null, user);
				            });
		        }
));

var app = express();
var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var ec2 = new AWS.EC2();
app.get('/', function(req, res){ res.send('hello world'); });
app.get('/ec2', function(req, res){ ec2.describeInstances( {}, function(err, data){ res.json(data); }); });
app.get('/auth/google',passport.authenticate('google', {scope:['profile']}));
app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), function(req, res){ res.redirect('/'); });
app.listen(80, function(){ console.log('connect 80 port'); });
