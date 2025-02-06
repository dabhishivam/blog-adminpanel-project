const passport = require('passport')
const Admin = require('../blog/blogmodel/adminmodel')
const { hashToplain } = require('../utils/password')
const localStrategy = require('passport-local').Strategy

module.exports = (passport)=>{
    passport.use(new localStrategy({usernameField:'email'},async(email,password,done)=>{
        const admin = await Admin.findOne({email})
        if(!admin){
            return done(null,false,console.log("user not found"))
        }
        const match = await hashToplain(password,admin.password)
         if(!match){
            return done(null,false,console.log("password not match"))
         }
         return done(null,admin)
    }))


    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(async function(id, done) {
        const user  = await Admin.findById(id)
        if(user){
            done(null,user)
        }
      });
}