import { useEffect, useState } from "react";
import Contact from "./Contact";
import Header from "./Header";
import { searchUser } from "../helper/helper";
import Profile from "./Profile";
import Loading, { LoadingContact } from "./Loading";
import search from "../assets/search.svg";
import { useSelector } from "react-redux";
import axios from "axios";

function Contacts() {
  /** SEARCH */
  const [searchResults, setSearchResults] = useState([]);
  const [searchMenu, setSearchMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isContactLoading, setIsContactLoading] = useState(true);
  const [conversation, setConversation] = useState([]);

  const { user, isLoading } = useSelector((state) => state.auth);

  const submitSearchUsers = (text) => {
    if (text) {
      const searchPromise = searchUser(text.toLowerCase());
      searchPromise.then((user) => {
        setSearchResults(user.data);
        setSearchMenu(true);
      });
    }
  };

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

  async function getConversations(userId) {
    setIsContactLoading(true);
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `http://localhost:8080/conversation/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("conv data ", data);
      setConversation(data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    } finally {
      setIsContactLoading(false);
    }
  }

  useEffect(() => {
    user && getConversations(user._id);
  }, [user]);

  if (isLoading) return <Loading />;
  return (
    <div className="h-screen bg-scroll overflow-auto">
      <Header />

      <div className="p-4 py-5 mt-4 mx-3 space-y-3 h-[39rem] bg-gray-800 bg-opacity-70 rounded-3xl shadow shadow-gray-800 overflow-auto">
        {/* search bar  */}
        <div className="flex justify-between rounded-2xl bg-[#000632] w-full p-3">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            className="flex-grow bg-transparent "
            type="text"
            placeholder="Search"
          />
          <img src={search} className="h-5 invert" alt="search-icon" />
        </div>

        {/* search result menu */}
        {searchMenu && (
          <div>
            <div className="flex justify-between items-center text-gray-400 ">
              <span className=" text-xs">Search Results</span>

              {/* cross button for search result  */}
              <svg
                onClick={() => setSearchMenu(false)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 cursor-pointer h-5"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </div>

            {searchResults.length === 0 ? (
              <p className="text-red-400 text-sm font-text1 text-center">
                No Such User!
              </p>
            ) : (
              searchResults?.map((user) => (
                <Contact
                  currentUserId={user?._id}
                  key={user._id}
                  picturePath={user.picturePath}
                  name={user.name}
                  size="12"
                />
              ))
            )}
            <hr />
          </div>
        )}

        {/* contact list */}
        {isContactLoading ? (
          <LoadingContact />
        ) : (
          //todo
          conversation?.map((contact) => (
            <Contact
              conversation={conversation}
              key={contact._id}
              // {...contact}
              currentUserId={user?._id}
              size="16"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Contacts;
