import express from "express";
import { usersControllers } from "./users.controller";
import auth from "../../middleware/auth";

const routes = express.Router();

routes.get("/", auth(), usersControllers.getAllUsers);
routes.put("/:userId", auth(), usersControllers.updateUsers);
routes.delete("/:userId", auth(), usersControllers.deleteUser);

export const userRoutes = {
  routes,
};
