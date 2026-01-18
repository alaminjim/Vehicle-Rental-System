import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../config/db";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        if (roles.length === 0) return next();
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const decoded = jwt.verify(
        token,
        config.jwtSecret as string,
      ) as JwtPayload;

      const userResult = await pool.query(
        `SELECT * FROM users WHERE email=$1`,
        [decoded.email],
      );

      if (userResult.rows.length === 0) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      next();
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: "Token expired or invalid",
      });
    }
  };
};

export default auth;
