import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../config/db";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("You are not authorized");
    }
    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
    const user = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
      `,
      [decoded.email]
    );
    if (user.rows.length === 0) {
      throw new Error("User not found!");
    }
    req.user = decoded;
    if (roles.length && !roles.includes(decoded.role)) {
      throw new Error("You are not authorized role");
    }
    next();
  };
};

export default auth;
