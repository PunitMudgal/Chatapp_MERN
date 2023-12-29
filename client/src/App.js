import React from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Login";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
