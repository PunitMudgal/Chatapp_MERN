import React from "react";
import avatar from "../assets/profile.png";

function Avatar({ size, profilePhoto }) {
  return (
    <img
      src={profilePhoto || avatar}
      className="rounded-full  object-cover"
      style={{
        height: size ? `${size}px` : "48px", // fallback to 48px (h-12)
        width: size ? `${size}px` : "48px",
      }}
      alt="img"
    />
  );
}

export default Avatar;
// h-${size || "14"} w-${
//   size || "14"
// }
