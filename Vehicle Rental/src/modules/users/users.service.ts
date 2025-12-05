import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM Users`);
  return result;
};

const updateUsers = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string,
  id: string
) => {
  const result = await pool.query(
    `UPDATE Users SET name=$1, email=$2, password=$3, phone=$4, role=$5 WHERE id=$6 RETURNING *`,
    [name, email, password, phone, role, id]
  );
  return result;
};

const deleteUsers = async (id: string) => {
  const result = await pool.query(`DELETE  FROM Users WHERE id=$1`, [id]);
  return result;
};

export const userService = {
  getAllUsers,
  updateUsers,
  deleteUsers,
};
