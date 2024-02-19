import { createContext, useContext, useEffect, useState } from "react";
import { UseUserContext } from "./UserContext";
import axios from "axios";

const ContactContext = createContext();

const ContactProvider = ({ children }) => {
  const [conversation, setConversation] = useState([]);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [isMenuItem, setIsMenuItem] = useState("");

  const { user } = UseUserContext();

  async function getConversation(userId) {
    setIsContactLoading(true);
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `http://localhost:8080/conversation/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setConversation(data);
      setIsContactLoading(false);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  useEffect(() => {
    console.log("useEffect conv called");
    getConversation(user?._id);
  }, [user]);

  /** Menu Item  */
  function SetMenuItem(menuItemName) {
    setIsMenuItem(menuItemName);
  }

  return (
    <ContactContext.Provider
      value={{
        isContactLoading,
        conversation,
        isMenuItem,
        SetMenuItem,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

const useContactContext = () => {
  return useContext(ContactContext);
};
export { useContactContext, ContactProvider };
