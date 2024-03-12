import prisma from "@/lib/prisma";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

interface GoogleProfile {
  id: string;
  _json: {
    name: string;
    picture: string;
  };
  emails: Array<{ value: string; verified: boolean }>;
}

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       callbackURL: `${process.env.APP_BASE_API}/auth/google/callback`,
//       scope: ["profile", "email"],
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     async (
//       _: string,
//       __: string,
//       profile: GoogleProfile,
//       callback: (err: any, user?: any) => void
//     ) => {
//       const newUser: any = {
//         googleId: profile?.id,
//         name: profile?._json.name,
//         email: profile.emails[0].value,
//         emailVerified: profile.emails[0].verified,
//         image: profile._json.picture || "",
//         provider: "google",
//         google: profile._json,
//       };

//       try {
//         let user = await prisma.user.findUnique({
//           where: { googleId: profile.id },
//         });

//         if (user) {
//           callback(null, user);
//         } else {
//           user = await prisma.user.create({ data: newUser });
//           callback(null, user);
//         }
//       } catch (err) {
//         console.log(err);
//         callback(err, null);
//       }
//     },
//   ),
// );

// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id: any, done) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id },
//     });
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });
