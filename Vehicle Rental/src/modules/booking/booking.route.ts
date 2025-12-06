import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const route = express.Router();

route.post("/", auth(), bookingController.createBooking);
route.get("/", auth(), bookingController.getBookings);
route.put("/:bookingId", auth(), bookingController.updateBooking);

export const bookingRoute = {
  route,
};
