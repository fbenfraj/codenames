import React, { useState } from "react";

const Login = ({ socket }) => {
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState([]);

  socket.on("sendRooms", rooms => {
    setRooms(rooms);
  })

  const joinRoom = room => {
    socket.emit("join", username, room, error => {
      if(error) {
        alert(error);
      } else {
        alert("You joined room : " + room)
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
            placeholder="Pseudo"
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
        </div>
      <div>
        <h2>Créez une nouvelle partie :</h2>
        <input type="text" placeholder="Room name" />
        <button onClick={() => joinRoom(socket)}>Créer</button>
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
