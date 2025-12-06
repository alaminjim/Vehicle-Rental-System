import { pool } from "../../config/db";

const createBookings = async (
  user_id: number,
  vehicle_id: number,
  rent_start_date: string,
  rent_end_date: string
) => {
  const isVehicle = await pool.query(`SELECT * FROM Vehicles WHERE id=$1`, [
    vehicle_id,
  ]);

  if (!isVehicle.rows.length) throw new Error("Vehicle not found");

  const vehicle = isVehicle.rows[0];

  if (vehicle.availability_status === "booked") {
    throw new Error("Vehicle is already booked");
  }

  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);

  if (endDate <= startDate)
    throw new Error("rent_end_date must be after rent_start_date");

  const days = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = vehicle.daily_rent_price * days;

  const result = await pool.query(
    `INSERT INTO Bookings (user_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [user_id, vehicle_id, startDate, endDate, totalPrice, "active"]
  );

  const booking = result.rows[0];

  await pool.query(
    `UPDATE Vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  return {
    ...booking,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

const getBookings = async (user: any) => {
  let result;

  if (user.role === "admin") {
    result = await pool.query(`
      SELECT Bookings.id,
             Bookings.user_id,
             Bookings.vehicle_id,
             Bookings.rent_start_date,
             Bookings.rent_end_date,
             Bookings.total_price,
             Bookings.status,
             Vehicles.vehicle_name,
             Vehicles.daily_rent_price
      FROM Bookings
      JOIN Vehicles ON Bookings.vehicle_id = Vehicles.id
      ORDER BY Bookings.id
    `);
  } else if (user.role === "customer") {
    result = await pool.query(
      `
      SELECT Bookings.id,
             Bookings.user_id,
             Bookings.vehicle_id,
             Bookings.rent_start_date,
             Bookings.rent_end_date,
             Bookings.total_price,
             Bookings.status,
             Vehicles.vehicle_name,
             Vehicles.daily_rent_price
      FROM Bookings
      JOIN Vehicles ON Bookings.vehicle_id = Vehicles.id
      WHERE Bookings.user_id = $1
      ORDER BY Bookings.id
    `,
      [user.id]
    );
  } else {
    throw new Error("Invalid user role");
  }

  return result.rows;
};

const updateBooking = async (bookingId: number, user: any) => {
  const result = await pool.query(`SELECT * FROM Bookings WHERE id=$1`, [
    bookingId,
  ]);

  if (result.rows.length === 0) {
    throw new Error("Booking not found");
  }

  const booking = result.rows[0];

  const today = new Date();

  if (user.role === "customer") {
    if (booking.user_id !== user.id) {
      throw new Error("Unauthorized to cancel this booking");
    }

    const startDate = new Date(booking.rent_start_date);
    if (today >= startDate) {
      throw new Error("Cannot cancel booking after start date");
    }

    // Cancel booking
    const result = await pool.query(
      `UPDATE Bookings SET status='cancelled' WHERE id=$1 RETURNING *`,
      [bookingId]
    );

    // Update vehicle availability
    await pool.query(
      `UPDATE Vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );

    return result.rows[0];
  } else if (user.role === "admin") {
    // Admin marks as returned
    const result = await pool.query(
      `UPDATE Bookings SET status='returned' WHERE id=$1 RETURNING *`,
      [bookingId]
    );

    // Update vehicle availability
    await pool.query(
      `UPDATE Vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );

    return result.rows[0];
  } else {
    throw new Error("Invalid user role");
  }
};

export const bookingService = {
  createBookings,
  getBookings,
  updateBooking,
};
