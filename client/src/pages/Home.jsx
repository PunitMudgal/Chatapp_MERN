import "../styles/home.css";
import Messenger from "../components/Messenger";
import { Outlet } from "react-router-dom";
import FetchUserData from "../helper/CustomHook";
import { useState } from "react";

function Home() {
  FetchUserData();
  const [currentChat, setCurrentChat] = useState(null);

  return (
    //todo remove extra div's
    <div className="flex h-screen bg-center text-white full_chat overflow-hidden">
      <div className="w-1/3 p-2 sm:hidden">
        <Outlet context={{ currentChat, setCurrentChat }} />{" "}
        {/* nested routes-> contacts & profile */}
      </div>

      <div className="w-2/3 p-2 flex-grow bg-gray-950 bg-opacity-30 bg-scroll">
        <Messenger currentChat={currentChat} />
      </div>
    </div>
  );
}

export default Home;
