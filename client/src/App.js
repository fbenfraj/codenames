import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Login from "./pages/Login/Login";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [socket, setSocket] = useState();

  useEffect(() => {
    setSocket(socketIOClient(ENDPOINT));
  }, []);

  return <Login socket={socket} />;
}

export default App;
