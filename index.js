import express from "express";
import db from "./database/db.js";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import groupRouter from "./routes/group.routes.js";

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id} `);

  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`User joined room : ${room}`);
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// for connecting backend and frontend

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());

app.use("/user", userRouter);
app.use("/chat", chatRouter)
app.use("/group" , groupRouter)

httpServer.listen(7800, () => {
  db();
  console.log(`Server is running on http://localhost:7800`);
});
