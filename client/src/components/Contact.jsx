import React, { useEffect, useState } from "react";
import Avatar from "./Avatar.jsx";
import FetchUserData from "../helper/CustomHook.js";

function Contact({ picturePath, name, size, currentUserId, conversation }) {
  const [friendData, setFriendData] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (currentUserId) {
        const friendId = conversation?.members?.filter(
          (m) => m !== currentUserId
        );
        const { data } = await FetchUserData(friendId);
        console.log("data", data);
        setFriendData(data);
      }
    }
    fetchUser();
  }, [currentUserId, conversation]);

  return (
    <div className="flex py-2  items-center gap-3 rounded-md mb-2 hover:bg-gray-900 hover:bg-opacity-40">
      <Avatar
        profilePhoto={picturePath || friendData?.picturePath}
        // firstLetterOfName={friendData?.name[0]}
        size={size}
      />
      <div>
        <span className="capitalize font-semibold text-gray-300 font-text2 ">
          {name || friendData?.name}
        </span>
        <p className="text-sm text-gray-500">This is the latest message...</p>
      </div>
    </div>
  );
}

export default Contact;
