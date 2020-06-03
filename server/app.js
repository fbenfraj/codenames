const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const { addUser, getUsersInRoom, removeUser } = require("./utils/users");

const { addRoom, getRooms } = require("./utils/rooms");
const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("sendRooms", getRooms());

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    socket.emit("userLeft", socket.id, () => {
      const user = removeUser(socket.id);
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    });
  });

  socket.on("join", (username, room, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      username,
      room,
    });
    addRoom(room);

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    console.log(`${user.username} joined ${user.room}`);

    callback();
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
