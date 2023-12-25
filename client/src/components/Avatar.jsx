import React from "react";

function Avatar({ size }) {
  return (
    <div
      className={`text-gray-600 font-semibold rounded-full bg-green-300 p-${
        size ? size : 4
      } md:p-3`}
    >
      <p>PM</p>
    </div>
  );
}

export default Avatar;
