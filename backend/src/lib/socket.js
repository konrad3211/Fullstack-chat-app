import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

//use to store online users
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  //jezeli jest userId to dodaj do tego obiektu userId = socketId np. user123 = dsad-ada-3213
  if (userId) userSocketMap[userId] = socket.id;

  //Serwer bierze listę wszystkich osób online, pakuje ją w paczkę o nazwie "getOnlineUsers" i „krzyczy” do wszystkich aplikacji frontendowych: „Hej, oto zaktualizowana lista osób online: [Jan123, Adam456, Ewa789]!”.Dzięki temu każda karta przeglądarki u każdego użytkownika dostaje tę samą listę i może np. wyświetlić zielone kropki przy znajomych.
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
