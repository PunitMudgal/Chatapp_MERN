import React from "react";
import avatar from "../assets/profile.png";

function Avatar({ size, profilePhoto }) {
  return (
    <div className={`max-h-14 max-w-14 `}>
      <img
        src={profilePhoto || avatar}
        className={`rounded-full object-cover ${size && `size-[${size}px]`}`}
        alt="img"
      />
    </div>
  );
}

export default Avatar;
// h-${size || "14"} w-${
//   size || "14"
// }
