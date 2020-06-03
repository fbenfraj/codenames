import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Login from "./pages/Login/Login";
import GameBoard from "./pages/GameBoard/GameBoard";

const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const socket = socketIOClient(ENDPOINT);
  const [activeMenu, setActiveMenu] = useState("loginMenu");

  return (
    <>
      {activeMenu === "loginMenu" && <Login socket={socket} onRoomJoin={() => setActiveMenu("gameMenu")}/>}
      {activeMenu === "gameMenu" && <GameBoard socket={socket} />}
    </>
  );
}

export default App;
