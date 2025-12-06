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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS Vehicles(
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(200) NOT NULL,
    type VARCHAR(20),
    registration_number VARCHAR(300) UNIQUE NOT NULL,
    daily_rent_price INT NOT NULL,
    availability_status VARCHAR(20)
    );
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS Bookings(
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
      vehicle_id INT NOT NULL REFERENCES Vehicles(id) ON DELETE CASCADE,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      total_price INT NOT NULL,
      status VARCHAR(20) NOT NULL 
       CHECK (status IN ('active', 'completed', 'cancelled'))
      )`);

  console.log("Database connected");
};
