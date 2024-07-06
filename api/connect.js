// import mysql from "mysql";
import dotenv from "dotenv";
import mysql2 from "mysql2";

// dotenv.config({ path: "./.env" });
dotenv.config();

const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASS", "DB"];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`Erro: A variável de ambiente ${varName} não está definida.`);
    process.exit(1);
  }
}

export const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  port: process.env.PORT,
});
