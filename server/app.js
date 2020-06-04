const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index = require("./routes/index");

const { addUser, getUsersInRoom, removeUser } = require("./utils/users");
const { addRoom, getRooms } = require("./utils/rooms");

const PORT = process.env.PORT || 4001;

const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("sendRooms", getRooms());

  //Listen player disconnection
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

  //Listen player join room
  socket.on("join", (username, room, callback) => {
    //Check if room isn't already full
    let roomLength = 0;
    const existingRoom = io.sockets.adapter.rooms[room.trim().toLowerCase()];
    if (existingRoom) {
      roomLength = existingRoom.length;
    }

    console.log(roomLength);

    if (roomLength >= 4) {
      return callback("Room is full. (max players: 4)");
    }

    const { error, user } = addUser({
      id: socket.id,
      username,
      room,
    });
    if (error) {
      return callback(error);
    }

    addRoom(room);

    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    console.log(`${user.username} joined ${user.room}`);
    callback();
  });
});

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
