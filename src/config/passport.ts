import prisma from "@/lib/prisma";

const GoogleStrategy = require("passport-google-oauth20").Strategy;
import passport from "passport";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.APP_BASE_API}/auth/google/callback`,
      scope: ["profile", "email"],
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async function (accessToken, refreshToken, profile, callback) {
      console.log(profile);
      const newUser: any = {
        googleId: profile?.id,
        name: profile?._json.name,
        email: profile.emails[0].value,
        emailVerified: profile.emails[0].verified,
        image: profile._json.picture || "",
        provider: "google",
        google: profile._json,
      };

      try {
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (user) {
          callback(null, user);
        } else {
          user = await prisma.user.create({ data: newUser });
          callback(null, user);
        }
      } catch (err) {
        console.log(err);
        callback(err, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: string, done) => {
  done(null, user);
});
