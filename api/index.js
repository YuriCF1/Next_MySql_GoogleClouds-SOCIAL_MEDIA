import express from "express";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import cors from "cors";

import bodyParser from "body-parser";

const app = express();

//Fazendo o app entender o formato json das respostas vindas do controller
app.use(express.json());

const allowedOrigins = ["http://localhost:3000"];

app.use(cors({ credentials: true, origin: allowedOrigins })); //crediantals: true = o servidor pode enviar e receber cookies e cabeçalhos de autenticação.

app.use(bodyParser.urlencoded({ extended: false })); //Recebendo os dados pelo método x-www-form-urlencoded do postman

app.use("/api/users/", userRouter);
app.use("/api/auth/", authRouter);

app.listen(8001, () => {
  console.log("Servidor rodando para a porta 8001");
});
