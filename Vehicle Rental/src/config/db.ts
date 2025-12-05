import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.pgConnectStr,
});

export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(50) NOT NULL
        )
        `);

  console.log("Database connected");
};
