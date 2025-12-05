import { Request, Response } from "express";
import { signinService } from "./signin.service";

const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await signinService.signinUser(email, password);
    res.status(200).json({
      success: true,
      message: "Users Signin successFull",
      data: {
        token: result.token,
        user: result.user,
      },
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const signinController = {
  signinUser,
};
