import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="index.html" element={<HomePage />} />
        <Route path="search" element={<SearchBooksPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
