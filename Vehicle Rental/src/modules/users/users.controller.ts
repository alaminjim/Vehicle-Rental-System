import { Request, Response } from "express";
import { userService } from "./users.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users found",
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
  const userId = req.params.userId;
  const loggedInUser = req.user;

  const { name, email, password, phone, role } = req.body;

  try {
    if (loggedInUser.role === "customer") {
      if (loggedInUser.id !== userId) {
        return res.status(403).json({
          success: false,
          message: "You are not allowed to update another user's profile",
        });
      }

      if (role) {
        return res.status(403).json({
          success: false,
          message: "Customers cannot update their role",
        });
      }
    }

    const result = await userService.updateUsers(
      name,
      email,
      password,
      phone,
      role,
      userId as string
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
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
