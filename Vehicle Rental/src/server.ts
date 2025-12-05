import express from "express";
import config from "./config";
import { initDB } from "./config/db";

import { signinRoute } from "./auth/signin/signin.route";
import { signUpRoute } from "./auth/signup/signup.route";

const app = express();
const port = config.port;

app.use(express.json());

//auth

app.use("/api/v1/auth", signUpRoute.route);
app.use("/api/v1/auth", signinRoute.route);

app.listen(port, async () => {
  await initDB();
  console.log(`server is running port on ---> ${port}`);
});
