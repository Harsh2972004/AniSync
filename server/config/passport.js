import passport from "passport";
import axios from "axios";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/userModel.js";
import { Strategy as OAuthStrategy } from "passport-oauth2";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        if (!user.isVerified) {
          return done(null, false, { message: "Email not verified." });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            isVerified: true, // Google accounts are verified
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "anilist",
  new OAuthStrategy(
    {
      authorizationURL: "http://anilist.co/api/v2/oauth/authorize",
      tokenURL: "https://anilist.co/api/v2/oauth/token",
      clientID: process.env.ANILIST_CLIENT_ID,
      clientSecret: process.env.ANILIST_CLIENT_SECRET,
      callbackURL: process.env.ANILIST_CALLBACK_URL,
    },
    async (accessToken, refreshToken, params, profile, done) => {
      console.log("AniList accessToken:", accessToken);
      console.log("AniList params:", params);
      try {
        // Fetch AniList user profile using axios
        const response = await axios.post(
          "https://graphql.anilist.co",
          {
            query: `
              query {
                Viewer {
                  id
                  name
                  avatar { large }
                  bannerImage
                }
              }
            `,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const viewer = response.data.data.Viewer;

        let user = await User.findOne({ anilistId: viewer.id });
        if (!user) {
          user = await User.create({
            name: viewer.name,
            email: `anilist_${viewer.id}@anilist.local`,
            anilistId: viewer.id,
            anilistAvatar: viewer.avatar?.large,
            isVerified: true,
            anilistBannerImage: viewer.bannerImage,
          });
        }
        return done(null, user);
      } catch (error) {
        console.error(
          "AniList axios error:",
          error.response?.data || error.message
        );
        return done(error, null);
      }
    }
  )
);
export default passport;
