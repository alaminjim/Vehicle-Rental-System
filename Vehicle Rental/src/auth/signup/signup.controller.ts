import { Request, Response } from "express";
import { signUpService } from "./signup.service";

const createSignUp = async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;

  try {
    const result = await signUpService.createSignUp(
      name,
      email,
      password,
      phone,
      role
    );
    res.status(201).json({
      success: true,
      message: "Users SignUp successFull",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const signUpController = {
  createSignUp,
};
