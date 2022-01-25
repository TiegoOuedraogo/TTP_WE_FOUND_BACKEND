//we are using this file to store the auth strategies
/* if the client send a request to the server and the it doesn't include
the auth information then the server will chanllenge the client
to submit them

auth header contains username and password
the resulting string is encoded using Base64*/

var passport = require('passport');
var LocalStrategy= require('passport-local').Strategy;
//import user from models
const User = require('./Capstone/Server/models/user');
const { authenticate } = require('passport');
const { plugin } = require('mongoose');

//json web token base strategy for config our passport module
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

//importing the confi
const cinfig = require ('./config');
const user = require('./Capstone/Server/models/user')
const { ExpectationFailed } = require('http-errors');



/* because are using session to track users in our app
config passport with the new local strtegy
we need to serialize and deserialize the passport

the verify function has to be called(User.authentification()) it will auto
supply the password and username
*/
passport.use(new LocalStrategy(User.authenticate()));
//provide on the user schema and model by use of the passport-local-mongoose
// plugin
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//help us to  create the jwt
exports.getToken = function(user){
    //return payload as user the secrekey and expireIn time
    return jwt.sign(user,config.secretKey,{expiresIn:3600});
};
//extracting from an incoming request msg
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false})