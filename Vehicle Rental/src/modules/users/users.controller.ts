import { Request, Response } from "express";
import { userService } from "./users.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateUsers = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const { name, email, password, phone, role } = req.body;
  try {
    const result = await userService.updateUsers(
      name,
      email,
      password,
      phone,
      role,
      id as string
    );
    if (result.rowCount === 0) {
      return res.status(200).json({
        success: true,
        message: "No user found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "users update successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.userId;

  try {
    const result = await userService.deleteUsers(id as string);
    if (result.rowCount === 0) {
      return res.status(200).json({
        success: true,
        message: "No users found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "users deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const usersControllers = {
  getAllUsers,
  updateUsers,
  deleteUser,
};
