import React from "react";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { NewBooks } from "./layouts/HomePage/NewBooks";
import { Carousel } from "./layouts/HomePage/Carousel";
import { LibraryServices } from "./layouts/HomePage/LibraryServices";
import { Footer } from "./layouts/NavbarAndFooter/Footer";

function App() {
  return (
    <>
      <Navbar />
      <NewBooks />
      <Carousel />
      <LibraryServices />
      <Footer />
    </>
  );
}

export default App;
