import "../styles/home.css";
import Contacts from "../components/Contacts";
import Messenger from "../components/Messenger";
import { UseUserContext } from "../context/UserContext";

function Home() {
  const { FetchHook } = UseUserContext();
  FetchHook();

  return (
    //todo remove extra div's
    <div className="flex h-screen bg-center text-white full_chat overflow-hidden">
      <div className="w-1/3 p-2 sm:hidden">
        <Contacts />
      </div>

      <div className="w-2/3 p-2 flex-grow bg-gray-950 bg-opacity-40 bg-scroll">
        <Messenger />
      </div>
    </div>
  );
}

export default Home;
// bg-blue-950 bg-opacity-60
