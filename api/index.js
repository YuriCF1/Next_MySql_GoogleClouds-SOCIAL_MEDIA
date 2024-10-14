import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import searchRouter from "./routes/search.js";
import uploadRouter from "./routes/upload.js";
import commentRouter from "./routes/comments.js";
import likesRouter from "./routes/likes.js";
import friendshipRouter from "./routes/friendship.js";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://next-my-sql-57iw.vercel.app",
    "https://next-my-sql-sigma.vercel.app",
    "https://nex-mysql-front-7lrrvgx3k-yuricf1s-projects.vercel.app/"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/users/", userRouter);
app.use("/api/auth/", authRouter);
app.use("/api/post/", postRouter);
app.use("/api/upload/", uploadRouter);
app.use("/api/comments/", commentRouter);
app.use("/api/likes/", likesRouter);
app.use("/api/friendship/", friendshipRouter);
app.use("/api/search/", searchRouter);

const portS = process.env.PORTS || 8001;
app.listen(portS, () => {
  console.log(`Servidor rodando na porta ${portS}`);
});
