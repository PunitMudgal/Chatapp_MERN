import React from "react";
import avatar from "../assets/profile.png";

function Avatar({ size, profilePhoto }) {
  return (
    <img
      src={profilePhoto || avatar}
      className={`rounded-full  object-cover w-auto ${
        size ? `h-${size}` : "h-12"
      }`}
      alt="img"
    />
  );
}

export default Avatar;
// h-${size || "14"} w-${
//   size || "14"
// }
