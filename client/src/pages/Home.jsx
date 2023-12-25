import React, { useEffect, useState } from "react";
import "../styles/home.css";
import Contacts from "../components/contacts";
import Messenger from "../components/Messenger";
import useFetch from "../helper/fetchHook";

function Home() {
  // const [ws, setWs] = useState(null);

  // useEffect(() => {
  //   const ws = new WebSocket("ws://localhost:8080");
  //   setWs(ws);
  //   console.log("this is ws inside home", ws);
  //   ws.addEventListener("message", handleMessage);
  // }, []);

  // function handleMessage(e) {
  //   console.log("new Message received", e);
  // }
  useFetch();

  return (
    //todo remove extra div's
    <div className="flex h-screen bg-center text-white full_chat">
      <div className="w-1/3 p-2 ">
        <Contacts />
      </div>

      <div className="w-2/3 p-2 bg-gray-950 bg-opacity-40 bg-scroll overflow-scroll">
        <Messenger />
      </div>
    </div>
  );
}

export default Home;
// bg-blue-950 bg-opacity-60
