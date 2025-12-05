import express from "express";
import { usersControllers } from "./users.controller";

const routes = express.Router();

routes.get("/", usersControllers.getAllUsers);
routes.put("/:userId", usersControllers.updateUsers);
routes.delete("/:userId", usersControllers.deleteUser);

export const userRoutes = {
  routes,
};
