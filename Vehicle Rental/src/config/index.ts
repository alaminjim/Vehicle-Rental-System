import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.PORT,
  pgConnectStr: process.env.PG_CONNECT_STR,
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
