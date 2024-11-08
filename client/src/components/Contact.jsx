import React, { useEffect, useState } from "react";
import Avatar from "./Avatar.jsx";
import { UseUserContext } from "../context/UserContext.js";

function Contact({ picturePath, name, size, currentUserId, members }) {
  const { FetchHook: fetchUserdata } = UseUserContext();
  const [friendData, setFriendData] = useState(null);

  useEffect(() => {
    if (currentUserId) {
      const friendId = members.filter((m) => m !== currentUserId);
      const friendData = fetchUserdata(friendId);
      friendData.then((data) => {
        setFriendData(data);
      });
    }
  }, [currentUserId, members]);

  return (
    <div className="flex p-2  items-center gap-3 rounded-md mb-2 hover:bg-sky-400 hover:bg-opacity-10">
      <Avatar
        profilePhoto={picturePath || friendData?.picturePath}
        // firstLetterOfName={friendData?.name[0]}
        size={size}
      />
      <div>
        <span className="capitalize font-semibold text-gray-300 font-text2 ">
          {name || friendData?.name}
        </span>
        <p className="text-sm text-gray-500">this is the latest message...</p>
      </div>
    </div>
  );
}

export default Contact;
