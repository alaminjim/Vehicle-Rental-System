import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { pool } from "../../../config/db";
import config from "../../../config";

const signinUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM Users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  delete user.password;

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

  console.log(user.role);

  return { token, user };
};

export const signinService = {
  signinUser,
};
