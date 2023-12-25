import React from "react";
import Contact from "./Contact";
import Header from "./Header";

function contacts() {
  return (
    <div className="h-screen ">
      <Header />

      <Contact />
      <Contact />
      <Contact />
      <Contact />
    </div>
  );
}

export default contacts;
