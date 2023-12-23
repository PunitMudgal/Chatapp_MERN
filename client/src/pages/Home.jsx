import React from "react";
import "../styles/home.css";

function Home() {
  return (
    <div className="flex full_chat h-screen bg-center text-white">
      <div className="w-1/3 bg-blue-950 bg-opacity-60 p-2">contacts</div>

      <div className="flex flex-col backdrop-blue-sm w-2/3 p-2">
        <div className="flex-grow bg-slate-900 bg-opacity-30">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
        </div>

        {/* bottom chat input and button  */}
        <div className="relative bottom-1 flex w-full gap-1">
          <input
            type="text"
            placeholder="Type Your Message Here..."
            className="bg-sky-100 rounded-md w-full p-3 flex-grow"
          />
          <button
            className="p-2 px-4 bg-purple-500 rounded-md hover:bg-purple-800"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
