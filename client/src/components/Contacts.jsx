import React, { useState } from "react";
import Contact from "./Contact";
import Header from "./Header";
import { searchUser } from "../helper/helper";
import Profile from "./Profile";

function Contacts() {
  /** SEARCHING */
  const [searchResults, setSearchResults] = useState([]);
  const [searchMenu, setSearchMenu] = useState(false);
  const [searchText, setSearchText] = useState("");

  /** PROFILE PAGE MENU */
  const [isMenuItem, setIsMenuItem] = useState("");

  const submitSearchUsers = () => {
    if (searchText) {
      const searchPromise = searchUser(searchText.toLowerCase());
      searchPromise.then((user) => {
        setSearchResults(user.data);
        setSearchMenu(true);
      });
    }
  };
  if (isMenuItem === "profile")
    return <Profile setIsMenuItem={setIsMenuItem} />;

  if (isMenuItem === "")
    return (
      <div className="h-screen bg-scroll overflow-auto">
        <Header
          submitSearchUsers={submitSearchUsers}
          searchText={searchText}
          setSearchText={setSearchText}
          setIsMenuItem={setIsMenuItem}
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
                  size={10}
                />
              ))
            )}
            <hr />
          </div>
        )}

        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
      </div>
    );
}

export default Contacts;
