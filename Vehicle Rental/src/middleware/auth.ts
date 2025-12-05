import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Missing or invalid authentication token" });
    }
    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
    req.user = decoded;
    next();
  };
};

export default auth;
