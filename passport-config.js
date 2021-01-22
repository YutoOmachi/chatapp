const { authenticate } = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

module.exports = function initialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) => {
        console.log({email: email, password:password});
        const user = getUserByEmail(email);
        console.log(user)
        if(user == null) {
            return done(null, false, {message: "no user with that email"});
        }

        try {
            // if (await bcrypt.compare(password, user.password)) {
            //     return done(null, user);
            // } else {
            if(password==user.password){
                return done(null, user);
            } else {
                return done(null, false, {message: "Password Incorrect"});
            }
        } catch(err){
            return done(err);
        }
    }
    passport.use(new LocalStrategy({usernameField: "email"}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        console.log(id)
      return done(null, getUserById(id))
    })
}