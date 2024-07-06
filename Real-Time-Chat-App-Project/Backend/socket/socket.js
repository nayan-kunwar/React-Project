import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]; //userSocketMap["65f079d52b9479dc388b24eb"]; it will find the userid form  Online user object
};
const userSocketMap = {}; // {userId: socketId} Online user object

io.on("connection", (socket) => {
  //console.log(`User is connected: ${socket.id}`);

  const userId = socket.handshake.query.userId; //Id of loggedin user
  if (userId != "undefined") userSocketMap[userId] = socket.id; // Put loogeedIn user id as a key and socket id(connected client id) as value.
  //Request URL:http://localhost:5000/socket.io/?userId=6682fc4bc39bf32a2b927c70&EIO=4&transport=polling&t=P28j929&sid=JpkKUegjvVB27VOqAAAG
  //Query start from ?, which can be access from --socket.handshake.query-- object
  //console.log('Connection query:', socket.handshake.query); // Query parameter from client which is sent in request url in Header tab

  io.emit("getOnlineUsers", Object.keys(userSocketMap)); //  Object.keys(userSocketMap)= [ '6682fc86c39bf32a2b927c7b', '6682fc4bc39bf32a2b927c70' ]
  //console.log(Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    //console.log(`User is disconnected: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
