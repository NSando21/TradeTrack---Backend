import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { join } from "path";

// Detectar entorno y cargar el archivo correspondiente
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: join(__dirname, "../../", envFile) });

export const databaseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: true,
  logging: process.env.NODE_ENV !== "production",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};
