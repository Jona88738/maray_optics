import { config } from "dotenv";
config()

export const PORT = 3000;

export const HOST_BD = process.env.HOST_BD;
export const PORT_BD = process.env.PORT_BD;
export const USER_BD = process.env.USER_BD;
export const PASSWORD_BD = process.env.PASSWORD_BD;
export const DATABASE = process.env.DATABASE;
