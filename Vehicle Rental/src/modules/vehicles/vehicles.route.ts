import express from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const routes = express.Router();

routes.get("/", vehiclesController.getVehicles);
routes.get("/:vehicleId", vehiclesController.getSingleVehicles);

routes.post("/", auth("admin"), vehiclesController.createVehicles);
routes.put("/:vehicleId", auth("admin"), vehiclesController.updateVehicles);
routes.delete("/:vehicleId", auth("admin"), vehiclesController.deleteVehicles);

export const vehiclesRoute = {
  routes,
};
