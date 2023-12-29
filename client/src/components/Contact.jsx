import React from "react";
import Avatar from "./Avatar.jsx";

function Contact({ picturePath, name, size }) {
  return (
    <div className="flex p-2 items-center gap-3 rounded-md mb-2 hover:bg-sky-400 hover:bg-opacity-10">
      <Avatar
        profilePhoto={picturePath}
        // firstLetterOfName={name[0]}
        size={size}
      />
      <div>
        <span className="capitalize font-semibold text-gray-300 font-text2 ">
          {name || "any name"}
        </span>
        <p className="text-sm text-gray-500">this is the latest message...</p>
      </div>
    </div>
  );
}

export default Contact;
