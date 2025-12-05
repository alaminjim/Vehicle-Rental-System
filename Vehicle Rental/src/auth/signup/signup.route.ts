import express from "express";
import { signUpController } from "./signup.controller";

const route = express.Router();

route.post("/signup", signUpController.createSignUp);

export const signUpRoute = {
  route,
};
