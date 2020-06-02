import React, { useState } from "react";

const Login = ({ socket }) => {
  const [username, setUsername] = useState("");
  // const [rooms, setRooms] = useState([]);

  const joinRoom = (socket) => {
    socket.emit("join", username, "Paris", (error) => {
      if (error) {
        alert(error);
      }
    });
  };

  return (
    <div>
      <h1>Bienvenue sur Codenames!</h1>
      <div>
        <input
          type="text"
          placeholder="Pseudo"
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>
        <select></select>
        <button>Refresh rooms list</button>
        <button onClick={() => joinRoom(socket)}>Join Room</button>
      </div>
      <div>
        <input type="text" placeholder="Pseudo"></input>
        <input type="text" placeholder="Room name" />
        <button>Create Room</button>
      </div>
    </div>
  );
};

export default Login;
