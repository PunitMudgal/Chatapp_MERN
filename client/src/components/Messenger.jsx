import React, { useEffect, useState } from "react";
import Message from "./Message";
import send from "../assets/send.png";
import { useSelector } from "react-redux";

function Messenger() {
  const [currentChat, setCurrentChat] = useState(null);
  const user = useSelector((state) => state.auth?.user);

  return (
    <div className="flex h-full flex-col mx-[3vw] overflow-auto md:mx-1">
      <div className="flex-grow mt-2 bg-scroll ">
        <Message />
        <Message own={true} />
        <Message />
        <Message own={true} />
      </div>

      {/* bottom chat input and button  */}
      <div className="sticky bottom-0 right-0 flex gap-1 px-20">
        <input
          type="text"
          placeholder="Type Your Message Here..."
          className="bg-gray-800 text-gray-200 rounded-lg w-full border-2 border-slate-700 p-2 px-4 font-text1 text-lg shadow-lg "
        />
        <button
          className="p-2 px-3 rounded-md border-2 border-slate-700 shadow-lg"
          type="submit"
        >
          <img src={send} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Messenger;
