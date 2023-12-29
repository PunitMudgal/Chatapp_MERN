import React from "react";

function Avatar({ size, profilePhoto, firstLetterOfName }) {
  return (
    <div>
      {profilePhoto ? (
        <img
          src={profilePhoto}
          className={`rounded-full h-${size || 14} w-${
            size || 14
          } object-cover`}
          alt="img"
        />
      ) : (
        <div
          className={` flex justify-center items-center  rounded-full bg-green-300 h-${
            size || 16
          } w-${size || "[4rem]"} md:p-3`}
        >
          <p className="uppercase font-semibold text-gray-600">
            {firstLetterOfName || "a"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Avatar;
