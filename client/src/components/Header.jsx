import { useState } from "react";

import account from "../assets/account.png";
import peoples from "../assets/peoples.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
import bell from "../assets/bell.svg";

import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  /** MENU */
  const [menu, setMenu] = useState(false);
  const user = useSelector((state) => state.auth?.user);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuList = [
    { name: "Profile", icon: account, action: null },
    { name: "Contacts", icon: peoples, action: null },
    { name: "Settings", icon: settings, action: null },
    { name: "Logout", icon: logout, action: handleLogout },
  ];

  return (
    <>
      <div className="flex items-center gap-3 px-3 py-3">
        <Avatar
          className="cursor-pointer"
          size="12"
          profilePhoto={user?.picturePath}
          onClick={() => setMenu((prev) => !prev)}
        />
        <div>
          <p className="font-semibold text-lm text-gray-400">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <img src={bell} className="invert h-5 ml-auto" alt="icon" />
      </div>

      {/* menu list */}
      {menu && (
        <div
          // onMouseLeave={() => setMenu(false)}
          className="absolute top-20 left-5 flex flex-col gap-3 rounded-lg hover: bg-blue-950 shadow-md"
        >
          {menuList.map((item) => (
            <p
              key={item.name}
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
    </>
  );
}

export default Header;
