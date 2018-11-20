const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy

passport.serializeUser(function(user, done){ done(null, user); });

passport.deserializeUser(function(obj, done){ done(null, obj); });

passport.use(new GoogleStrategy({ clientID : '492957928974-m787u6t7r2lkp847sttu8gusi8bc0jja.apps.googleusercontent.com',
				clientSecret : 'P4Wqn5OOxwZ3jKfZ992VZwGG',
				callbackURL : 'www.naver.com'
				}, function(accessToken, refreshToken, profile, done){ process.nextTick(function() {user = profile; return done(null, user);
				});
				}
)};
