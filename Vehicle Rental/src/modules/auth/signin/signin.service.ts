import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { pool } from "../../../config/db";
import config from "../../../config";

const signinUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM Users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    throw new Error("User not Found");
  }

  const user = await result.rows[0];
  const isMatch = await bcrypt.compare(password, result.rows[0].password);

  if (!isMatch) {
    throw new Error("User not found");
  }

  delete result.rows[0].password;

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    config.jwtSecret as string,
    { expiresIn: "7d" }
  );

  return { token, user };
};

export const signinService = {
  signinUser,
};
