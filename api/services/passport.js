const passport = require('passport')
const ExtractJwt  = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local')

const user = require('../models/user')
const config= require('../config')

const localOptions ={
    usernameField: 'email'
}

const localStrategy = new LocalStrategy(localOptions, async function(email, password, done){
    try {
        const aUser = await user.findOne({email: email});
        if(!aUser) {
            return done(null, false);
        }
        const isMatch = await user.comparePassword({password});
        if(!isMatch) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

const jwtOptions = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
}

const JwtStrategyy = new JwtStrategy(jwtOptions, async function(payload, done){
    try {
        const theUser = await user.findById(payload.sub);
        if(theUser){
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, false);
    }
});

passport.use(localStrategy)
passport.use(JwtStrategyy)