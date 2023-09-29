import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Request, Response, NextFunction } from "express";
import prisma from "@/core/database";
import env from "@/config";
import passport from "passport";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.APP_SECRET,
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.use(
    new JwtStrategy(opts, async function async(jwt_payload, done) {
      const user = await prisma.users.findFirst({
        where: {
          [env.AUTH_TABLE_USERNAME]: jwt_payload.sub,
        },
      });
      if (!user) return done(null, false);
      return done(null, user);
    })
  );
};
export default authMiddleware;
