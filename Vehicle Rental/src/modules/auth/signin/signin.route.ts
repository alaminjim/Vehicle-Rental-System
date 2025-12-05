import express from "express";
import { signinController } from "./signin.controller";
import auth from "../../../middleware/auth";

const route = express.Router();

route.post("/", auth(), signinController.signinUser);

export const signinRoute = {
  route,
};
