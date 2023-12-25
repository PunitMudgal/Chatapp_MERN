import React from "react";

function Header() {
  return (
    <div className="flex items-center gap-3 p-4 w-full">
      {/* menu  */}
      <div className="rounded-full hover:bg-purple-600 p-2 cursor-pointer">
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      {/* search  */}
      <div className="flex flex-grow items-center gap-2 p-1 px-2 rounded-3xl border-2 border-purple-600 bg-blue-800 bg-opacity-10 ">
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          className="bg-transparent p-1 w-full"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default Header;
