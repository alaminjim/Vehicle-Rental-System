import express from "express";
import config from "./config";
import { initDB } from "./config/db";

import { signUpRoute } from "./modules/auth/signup/signup.route";
import { signinRoute } from "./modules/auth/signin/signin.route";
import { vehiclesRoute } from "./modules/vehicles/vehicles.route";
import { userRoutes } from "./modules/users/users.route";
import { bookingRoute } from "./modules/booking/booking.route";

const app = express();
const port = config.port;

app.use(express.json());

initDB();

//auth
app.use("/api/v1/auth/signup", signUpRoute.route);
app.use("/api/v1/auth/signin", signinRoute.route);

// vehicles
app.use("/api/v1/vehicles", vehiclesRoute.routes);

//users
app.use("/api/v1/users", userRoutes.routes);

//booking
app.use("/api/v1/bookings", bookingRoute.route);

app.listen(port, async () => {
  console.log(`server is running port on ---> ${port}`);
});
