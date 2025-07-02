import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/models";
import { JwtPayload, verifyJwt } from "../utils/jwt";

const SECRET_KEY = process.env.SECRET_KEY as string;
export async function JwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    next("Error: 401 Token not found");
    return;
  }
  const { email }: JwtPayload = await verifyJwt<JwtPayload>(token);
  const user = await User.findOne({ email: email });
  if (!user) {
    return next("User Not Found");
  }
  req.user = user;
  next();
}
