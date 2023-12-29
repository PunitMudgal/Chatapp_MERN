import "../styles/home.css";
import Contacts from "../components/Contacts";
import Messenger from "../components/Messenger";

function Home() {
  return (
    //todo remove extra div's
    <div className="flex h-screen bg-center text-white full_chat overflow-hidden">
      <div className="w-1/3 p-2 ">
        <Contacts />
      </div>

      <div className="w-2/3 p-2 bg-gray-950 bg-opacity-40 bg-scroll">
        <Messenger />
      </div>
    </div>
  );
}

export default Home;
// bg-blue-950 bg-opacity-60
