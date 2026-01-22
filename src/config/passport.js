const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");



/* GOOGLE  */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (_, __, profile, done) => {
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email,
        });
      }
      done(null, user);
    }
  )
);

/* LINKEDIN (AUTH ONLY – SAFE) */
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/linkedin/callback",
      scope: ["openid", "profile", "email"],
      state: false,
      skipUserProfile: true, 
    },
    async (accessToken, refreshToken, profile, done) => {
      
      return done(null, {
        linkedinId: `linkedin_${Date.now()}`,
      });
    }
  )
);

module.exports = passport;
