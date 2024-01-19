import { useState } from "react";
import Contact from "./Contact";
import Header from "./Header";
import { searchUser } from "../helper/helper";
import Profile from "./Profile";
import { UseUserContext } from "../context/UserContext";
import { useContactContext } from "../context/ContactsContext";
import Loading, { LoadingContact } from "./Loading";

function Contacts() {
  /** SEARCH */
  const [searchResults, setSearchResults] = useState([]);
  const [searchMenu, setSearchMenu] = useState(false);
  const [menuItem, setMenuItem] = useState("");

  const { user, isUserDataLoading } = UseUserContext();
  const { conversation, isContactLoading } = useContactContext();

  const submitSearchUsers = (text) => {
    if (text) {
      const searchPromise = searchUser(text.toLowerCase());
      searchPromise.then((user) => {
        setSearchResults(user.data);
        setSearchMenu(true);
      });
    }
  };
  if (isUserDataLoading) return <Loading />;
  if (menuItem === "profile") return <Profile setMenuItem={setMenuItem} />;

  if (menuItem === "")
    return (
      <div className="h-screen bg-scroll overflow-auto">
        <Header
          submitSearchUsers={submitSearchUsers}
          setMenuItem={setMenuItem}
        />
        {/* search results  */}
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
                  key={user._id}
                  picturePath={user.picturePath}
                  name={user.name}
                  size={12}
                />
              ))
            )}
            <hr />
          </div>
        )}

        {!isContactLoading ? (
          conversation.map((contact) => (
            <Contact
              key={contact._id}
              {...contact}
              currentUserId={user?._id}
              size={14}
            />
          ))
        ) : (
          <LoadingContact />
        )}
      </div>
    );
}

export default Contacts;
