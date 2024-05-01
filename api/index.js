import express from "express";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

import bodyParser from "body-parser";

const app = express();

//Fazendo o app entender o formato json das respostas vindas do controller
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}))

app.use("/api/users/", userRouter);
app.use("/api/auth/", authRouter);

app.listen(8001, () => {
  console.log("Servidor rodando para a porta 8001");
});
