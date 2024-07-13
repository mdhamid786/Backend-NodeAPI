const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");


passport.use(
    new GoogleStrategy(
        {
            clientID:"",
            clientSecret:"",
            callbackURL:"/auth/google/callback",
            scope:["profile","email"]
        },

        async function (accessToken, refreshToken, profile, cb){
            let data  = profile?._json;
            const user = await User.findOne({email:data.email});

            if(user){
                return await cb(null , user)
            } else {
                const newUser = await User.create({
                    firstname:data.name,
                    lastname:data.given_name,
                    user_image:data.picture,
                    email:data.email,
                    role:"user"
                });
                return await cb(null , newUser)
            }
        }
    )
)

passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser((user, done)=>{
    done(null, user)
})