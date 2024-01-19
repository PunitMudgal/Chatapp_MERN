import React from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Login";
import { UserProvider } from "./context/UserContext";
import { ContactProvider } from "./context/ContactsContext";

function App() {
  return (
    <>
      <UserProvider>
        <ContactProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Signin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ContactProvider>
      </UserProvider>
    </>
  );
}

export default App;
