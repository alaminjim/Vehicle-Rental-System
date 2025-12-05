import { pool } from "../../../config/db";
import bcrypt from "bcryptjs";

const createSignUp = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
) => {
  if (password.length <= 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const hashPassword = await bcrypt.hash(password as string, 10);

  const emailStr = (email as string).toLowerCase();

  const result = await pool.query(
    `INSERT INTO Users (name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, emailStr, hashPassword, phone, role]
  );

  delete result.rows[0].password;

  return result;
};

export const signUpService = {
  createSignUp,
};
