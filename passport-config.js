const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

module.exports = function initialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        if(Object.keys(user).length==0) {
            return done(null, false, {message: "no user with that email"});
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
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
    passport.deserializeUser(async (id, done) => {
      return done(null, await getUserById(id))
    })
}