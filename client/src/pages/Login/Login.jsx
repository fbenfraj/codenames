import React, { useState } from "react";

const Login = ({ socket, onRoomJoin }) => {
  const [username, setUsername] = useState("Bob");
  const [roomName, setRoomName] = useState("MyAmazingRoom");
  const [rooms, setRooms] = useState([]);

  socket.on("sendRooms", rooms => {
    setRooms(rooms);
  })

  const joinRoom = room => {
    socket.emit("join", username, room, error => {
      if(error) {
        alert(error);
      } else {
        onRoomJoin();
      }
    });
  }

  return (
    <div>
      <h1>Bienvenue sur Codenames!</h1>
      <div>
        <h2>Saisissez une pseudo :</h2>
        <input
            type="text"
            value={username}
            placeholder="Pseudo"
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
        </div>
      <div>
        <h2>Créez une nouvelle partie :</h2>
        <input
          type="text"
          value={roomName}
          placeholder="Room name"
          onChange={(e) => setRoomName(e.target.value)
        }/>
        <button onClick={() => joinRoom(roomName)}>Créer</button>
      </div>
      <div>
        <h2>Ou rejoignez une partie existante :</h2>
        {rooms.map(room => (
          <button onClick={() => joinRoom(room)}>{room}</button>
        ))}
      </div>
    </div>
  );
};

export default Login;
