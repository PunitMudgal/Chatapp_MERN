import React from "react";
import Message from "./Message";

function Messenger() {
  return (
    <div className="flex h-full flex-col px-24">
      <div className="flex-grow mt-2">
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
          className="p-2 px-3 bg-purple-500 rounded-md hover:bg-purple-800 border-2 border-slate-700 shadow-lg"
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
  );
}

export default Messenger;
