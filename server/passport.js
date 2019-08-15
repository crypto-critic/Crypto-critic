const authorizationKey = require('../endpoints/endpoints').authorizationKey;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./models/User');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromHeader(authorizationKey);
opts.secretOrKey = 'pinokarahere';

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        User.findOne({email: jwt_payload.email})
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));
    }));
};