const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer); 
const port = 3000;

io.on("connection", socket => {
  console.log("a user connected :D");

  socket.on("chatMessage", msg => {
  console.log(msg);
  
  io.emit("RecivedChatMessage", msg);
  });

});

httpServer.listen(port, () => console.log("server running on port " + port + " " + app ));