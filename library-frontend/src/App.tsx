import React from "react";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { NewBooks } from "./layouts/HomePage/NewBooks";
import { Carousel } from "./layouts/HomePage/Carousel";

function App() {
  return (
    <>
      <Navbar />
      <NewBooks />
      <Carousel />
    </>
  );
}

export default App;
