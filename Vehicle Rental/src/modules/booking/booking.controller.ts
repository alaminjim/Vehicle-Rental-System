import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  const { user_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

  try {
    const booking = await bookingService.createBookings(
      user_id,
      vehicle_id,
      rent_start_date,
      rent_end_date
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getBookings(req.user);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  const bookingId = Number(req.params.bookingId);

  try {
    const updatedBooking = await bookingService.updateBooking(
      bookingId,
      req.user
    );

    res.status(200).json({
      success: true,
      message: `Booking updated successfully`,
      data: updatedBooking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  updateBooking,
};
