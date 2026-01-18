import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.createVehicles(req.body);
    res.status(201).json({
      success: true,
      message: "vehicles Created successFull",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    console.log("Fetching vehicles...");
    const result = await vehiclesServices.getVehicles();
    console.log("Rows fetched:", result.rows.length);

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getSingleVehicles = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
  try {
    const result = await vehiclesServices.getSingleVehicles(id as string);

    if (result.rowCount === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateVehicles = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;
  const { vehicle_name, daily_rent_price, availability_status } = req.body;

  try {
    const result = await vehiclesServices.updateVehicles(
      vehicle_name,
      daily_rent_price,
      availability_status,
      id as string,
    );

    if (result.rowCount === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteVehicles = async (req: Request, res: Response) => {
  const id = req.params.vehicleId;

  try {
    const result = await vehiclesServices.deleteVehicles(id as string);

    if (result.rowCount === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const vehiclesController = {
  createVehicles,
  getVehicles,
  getSingleVehicles,
  updateVehicles,
  deleteVehicles,
};
