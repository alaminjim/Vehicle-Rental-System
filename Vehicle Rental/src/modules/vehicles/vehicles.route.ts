import express from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const routes = express.Router();

routes.post("/", auth(), vehiclesController.createVehicles);
routes.get("/", auth(), vehiclesController.getVehicles);
routes.get("/:vehicleId", auth(), vehiclesController.getSingleVehicles);
routes.put("/:vehicleId", auth(), vehiclesController.updateVehicles);
routes.delete("/:vehicleId", auth(), vehiclesController.deleteVehicles);

export const vehiclesRoute = {
  routes,
};
