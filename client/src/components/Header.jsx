import React, { useEffect, useState } from "react";

import account from "../assets/account.png";
import peoples from "../assets/peoples.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";

import { useContactContext } from "../context/ContactsContext";
import { useNavigate } from "react-router-dom";

function Header({ submitSearchUsers, setMenuItem }) {
  /** MENU */
  const [menu, setMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (searchText) {
      const timer = setTimeout(() => {
        submitSearchUsers(searchText);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchText]);

  const menuList = [
    { name: "Profile", icon: account, action: null },
    { name: "Contacts", icon: peoples, action: null },
    { name: "Settings", icon: settings, action: null },
    { name: "Logout", icon: logout, action: null },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex items-center gap-3 p-4 w-full">
      {/* menu ham berger */}
      <div
        className=" cursor-pointer p-2 hover:bg-purple-600 rounded-full "
        onClick={() => setMenu(!menu)}
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      {/* MENU ITEMS  */}
      {menu && (
        <div
          // onMouseLeave={() => setMenu(false)}
          className="absolute top-20 left-5 flex flex-col gap-3 rounded-lg hover: bg-blue-950 shadow-md"
        >
          {menuList.map((item) => (
            <p
              onClick={item.action}
              className="cursor-pointer hover:bg-purple-700 px-6 py-3 rounded-lg "
            >
              <img
                className="invert h-5 w-auto inline mr-1"
                src={item.icon}
                alt="icon"
              />{" "}
              {item.name}
            </p>
          ))}
        </div>
      )}

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
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="text"
          className="bg-transparent p-1 w-full"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default Header;
