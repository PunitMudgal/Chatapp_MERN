import React, { useEffect, useState } from "react";
import Avatar from "./Avatar.jsx";
import FetchUserData from "../helper/CustomHook.js";
import axios from "axios";
import { LoadingHeader } from "./Loading.jsx";

function Contact({ picturePath, name, size, currentUserId, members }) {
  const [friendData, setFriendData] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const friendId = members?.find((member) => member !== currentUserId);

    const fetchUserData = async () => {
      // setIsLoading(true);
      try {
        const { data } = await axios.get(`/user/${friendId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriendData(data);
      } catch (error) {
        console.log(error);
      }
    };
    friendId && fetchUserData();
  }, [currentUserId, members, token]);

  if (!friendData) return <LoadingHeader />;

  return (
    <div className="flex py-2 items-center gap-3 rounded-md mb-2 hover:bg-gray-900 hover:bg-opacity-40">
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
