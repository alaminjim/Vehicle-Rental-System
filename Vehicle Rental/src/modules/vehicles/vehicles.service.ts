import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO Vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ],
  );
  return result;
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM Vehicles`);
  return result;
};

const getSingleVehicles = async (id: string) => {
  const result = await pool.query(`SELECT * FROM Vehicles WHERE id=$1`, [id]);
  return result;
};

const updateVehicles = async (
  vehicle_name: string,
  daily_rent_price: number,
  availability_status: string,
  id: string,
) => {
  const result = await pool.query(
    `UPDATE Vehicles SET vehicle_name=$1, daily_rent_price=$2, availability_status=$3 WHERE id=$4 RETURNING *`,
    [vehicle_name, daily_rent_price, availability_status, id],
  );
  return result;
};

const deleteVehicles = async (id: string) => {
  const check = await pool.query(
    `SELECT availability_status FROM Vehicles WHERE id=$1`,
    [id],
  );

  if (check.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  if (check.rows[0].availability_status === "booking") {
    throw new Error("Booked vehicles cannot be deleted");
  }

  const result = await pool.query(
    `DELETE FROM Vehicles WHERE id=$1 RETURNING *`,
    [id],
  );

  return result;
};

export const vehiclesServices = {
  createVehicles,
  getVehicles,
  getSingleVehicles,
  updateVehicles,
  deleteVehicles,
};
