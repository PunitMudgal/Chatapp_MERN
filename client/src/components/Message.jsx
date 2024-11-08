import React from "react";
import Avatar from "./Avatar";

function Message({ own }) {
  return (
    <div
      className={`flex flex-col gap-1 mb-5 ${
        own ? "items-end ml-auto" : "items-start"
      } max-w-lg `}
    >
      <div className="flex items-start gap-2">
        {!own && <Avatar size="10" />}
        <p
          className={`${
            own ? "bg-zinc-800" : "bg-indigo-800"
          } bg-opacity-80 text-white rounded-xl p-2`}
        >
          This is Message Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Deleniti, voluptatem natus id aut, dolore quod hic sequi dolor
        </p>
        {own && <Avatar size={"10"} />}
      </div>
      <span className="bg-gray-700 rounded-xl bg-opacity-30 p-1 text-[11px] font-light ">
        5 min ago
      </span>
    </div>
  );
}

export default Message;
