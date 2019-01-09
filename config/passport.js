const passport = require('passport');


const LocalStrategy = require('passport-local').Strategy;


const bcrypt = require('bcryptjs');
passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
  User.findOne({
    email
  },(err,user) => {
    if(err){
      return done(err);
    }
    if(!user){
      return done(null, false, { message : 'Email not registered' });
    }
    bcrypt.compare(password, user.password, (err,res) => {
      if(err) {
        return done(err);
      }
      if(!res){
        return done(null, false, { message: 'Password is incorrect' });
      }
      return done(null, user, 'Sign in Success' );
    });
  });
}));
