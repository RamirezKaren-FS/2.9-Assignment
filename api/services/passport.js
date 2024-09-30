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

// const localStrategy = new LocalStrategy(localOptions, async function(email, password, done){
//     user.comparePassword(password, function(error, isMatch) {
//                     if(error) {return done(error)}
//                     if(!isMatch) {return done(null, false)}
//                     return done(null, user);
//                 })
//     try {
//         const aUser = await user.findOne({email: email});
//         if(!aUser) {
//             return done(null, false);
//         }
//     } catch (error) { 
//         return done(error);
//     }
// });



// const localStrategy = new LocalStrategy(localOptions, function(email, password, done){
//     user.findOne({email: email}, function(error, user){
//         if(error){return done(error)}
//         if(!user){return done(null, false)}
//         user.comparePassword(password, function(error, isMatch){
//             if(error){return done(error)}
//             if(!isMatch){return done(null, false)}
//             return done(null, user);
//         })
//     })
// })

const jwtOptions = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
}

// const JwtStrategyy = new JwtStrategy(jwtOptions, function(payload, done){
//     user.findById(payload.sub, function(error, user){
//         if(error){return done(error, false)}
//         if(user){
//             done(null, user)
//         }
//         else{
//             done(null, false)
//         }
//     })
// })

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